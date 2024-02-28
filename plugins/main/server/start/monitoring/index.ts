/*
 * Fortishield app - Module for agent info fetching functions
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import cron from 'node-cron';
import { monitoringTemplate } from '../../integration-files/monitoring-template';
import { getConfiguration } from '../../lib/get-configuration';
import { parseCron } from '../../lib/parse-cron';
import { indexDate } from '../../lib/index-date';
import { buildIndexSettings } from '../../lib/build-index-settings';
import {
  FORTISHIELD_MONITORING_DEFAULT_CRON_FREQ,
  FORTISHIELD_MONITORING_TEMPLATE_NAME,
} from '../../../common/constants';
import { tryCatchForIndexPermissionError } from '../tryCatchForIndexPermissionError';
import { delayAsPromise } from '../../../common/utils';
import { getSettingDefaultValue } from '../../../common/services/settings';

let MONITORING_ENABLED,
  MONITORING_FREQUENCY,
  MONITORING_CRON_FREQ,
  MONITORING_CREATION,
  MONITORING_INDEX_PATTERN,
  MONITORING_INDEX_PREFIX;

// Utils functions
/**
 * Get the setting value from the configuration
 * @param setting
 * @param configuration
 * @param defaultValue
 */
function getAppConfigurationSetting(
  setting: string,
  configuration: any,
  defaultValue: any,
) {
  return typeof configuration[setting] !== 'undefined'
    ? configuration[setting]
    : defaultValue;
}

/**
 * Set the monitoring variables
 * @param context
 */
function initMonitoringConfiguration(context) {
  try {
    context.fortishield.logger.debug('Reading configuration');
    const appConfig = getConfiguration();
    MONITORING_ENABLED =
      appConfig && typeof appConfig['fortishield.monitoring.enabled'] !== 'undefined'
        ? appConfig['fortishield.monitoring.enabled'] &&
          appConfig['fortishield.monitoring.enabled'] !== 'worker'
        : getSettingDefaultValue('fortishield.monitoring.enabled');
    MONITORING_FREQUENCY = getAppConfigurationSetting(
      'fortishield.monitoring.frequency',
      appConfig,
      getSettingDefaultValue('fortishield.monitoring.frequency'),
    );
    try {
      MONITORING_CRON_FREQ = parseCron(MONITORING_FREQUENCY);
    } catch (error) {
      context.fortishield.logger.warn(
        `Using default value ${FORTISHIELD_MONITORING_DEFAULT_CRON_FREQ} due to: ${
          error.message || error
        }`,
      );
      MONITORING_CRON_FREQ = FORTISHIELD_MONITORING_DEFAULT_CRON_FREQ;
    }
    MONITORING_CREATION = getAppConfigurationSetting(
      'fortishield.monitoring.creation',
      appConfig,
      getSettingDefaultValue('fortishield.monitoring.creation'),
    );

    MONITORING_INDEX_PATTERN = getAppConfigurationSetting(
      'fortishield.monitoring.pattern',
      appConfig,
      getSettingDefaultValue('fortishield.monitoring.pattern'),
    );
    const lastCharIndexPattern =
      MONITORING_INDEX_PATTERN[MONITORING_INDEX_PATTERN.length - 1];
    if (lastCharIndexPattern !== '*') {
      MONITORING_INDEX_PATTERN += '*';
    }
    MONITORING_INDEX_PREFIX = MONITORING_INDEX_PATTERN.slice(
      0,
      MONITORING_INDEX_PATTERN.length - 1,
    );

    context.fortishield.logger.debug(
      `fortishield.monitoring.enabled: ${MONITORING_ENABLED}`,
    );

    context.fortishield.logger.debug(
      `fortishield.monitoring.frequency: ${MONITORING_FREQUENCY} (${MONITORING_CRON_FREQ})`,
    );

    context.fortishield.logger.debug(
      `fortishield.monitoring.creation: ${MONITORING_CREATION}`,
    );

    context.fortishield.logger.debug(
      `fortishield.monitoring.pattern: ${MONITORING_INDEX_PATTERN} (index prefix: ${MONITORING_INDEX_PREFIX})`,
    );
  } catch (error) {
    context.fortishield.logger.error(error.message);
  }
}

/**
 * Main. First execution when installing / loading App.
 * @param context
 */
async function init(context) {
  try {
    if (MONITORING_ENABLED) {
      await checkTemplate(context);
    }
  } catch (error) {
    const errorMessage = error.message || error;
    context.fortishield.logger.error(errorMessage);
  }
}

/**
 * Verify fortishield-agent template
 */
async function checkTemplate(context) {
  try {
    try {
      context.fortishield.logger.debug(
        `Getting the ${FORTISHIELD_MONITORING_TEMPLATE_NAME} template`,
      );
      // Check if the template already exists
      const currentTemplate =
        await context.core.opensearch.client.asInternalUser.indices.getTemplate(
          {
            name: FORTISHIELD_MONITORING_TEMPLATE_NAME,
          },
        );
      // Copy already created index patterns
      monitoringTemplate.index_patterns =
        currentTemplate.body[FORTISHIELD_MONITORING_TEMPLATE_NAME].index_patterns;
    } catch (error) {
      // Init with the default index pattern
      monitoringTemplate.index_patterns = [
        getSettingDefaultValue('fortishield.monitoring.pattern'),
      ];
    }

    // Check if the user is using a custom pattern and add it to the template if it does
    if (!monitoringTemplate.index_patterns.includes(MONITORING_INDEX_PATTERN)) {
      monitoringTemplate.index_patterns.push(MONITORING_INDEX_PATTERN);
    }

    // Update the monitoring template
    context.fortishield.logger.debug(
      `Updating the ${FORTISHIELD_MONITORING_TEMPLATE_NAME} template`,
    );
    await context.core.opensearch.client.asInternalUser.indices.putTemplate({
      name: FORTISHIELD_MONITORING_TEMPLATE_NAME,
      body: monitoringTemplate,
    });
    context.fortishield.logger.info(
      `Updated the ${FORTISHIELD_MONITORING_TEMPLATE_NAME} template`,
    );
  } catch (error) {
    const errorMessage = `Something went wrong updating the ${FORTISHIELD_MONITORING_TEMPLATE_NAME} template ${
      error.message || error
    }`;
    context.fortishield.logger.error(errorMessage);
    throw error;
  }
}

/**
 * Save agent status into elasticsearch, create index and/or insert document
 * @param {*} context
 * @param {*} data
 */
async function insertMonitoringDataElasticsearch(context, data) {
  const monitoringIndexName =
    MONITORING_INDEX_PREFIX + indexDate(MONITORING_CREATION);
  if (!MONITORING_ENABLED) {
    return;
  }
  try {
    await tryCatchForIndexPermissionError(monitoringIndexName)(async () => {
      context.fortishield.logger.debug(
        `Checking the existence of ${monitoringIndexName} index`,
      );
      const exists =
        await context.core.opensearch.client.asInternalUser.indices.exists({
          index: monitoringIndexName,
        });
      if (!exists.body) {
        context.fortishield.logger.debug(
          `The ${monitoringIndexName} index does not exist`,
        );
        await createIndex(context, monitoringIndexName);
      } else {
        context.fortishield.logger.debug(`The ${monitoringIndexName} index exists`);
      }

      // Update the index configuration
      const appConfig = getConfiguration();
      const indexConfiguration = buildIndexSettings(
        appConfig,
        'fortishield.monitoring',
        getSettingDefaultValue('fortishield.monitoring.shards'),
      );

      // To update the index settings with this client is required close the index, update the settings and open it
      // Number of shards is not dynamic so delete that setting if it's given
      delete indexConfiguration.settings.index.number_of_shards;
      context.fortishield.logger.debug(
        `Adding settings to ${monitoringIndexName} index`,
      );
      await context.core.opensearch.client.asInternalUser.indices.putSettings({
        index: monitoringIndexName,
        body: indexConfiguration,
      });

      context.fortishield.logger.info(
        `Settings added to ${monitoringIndexName} index`,
      );

      // Insert data to the monitoring index
      await insertDataToIndex(context, monitoringIndexName, data);
    })();
  } catch (error) {
    context.fortishield.logger.error(error.message || error);
  }
}

/**
 * Inserting one document per agent into Elastic. Bulk.
 * @param {*} context Endpoint
 * @param {String} indexName The name for the index (e.g. daily: fortishield-monitoring-YYYY.MM.DD)
 * @param {*} data
 */
async function insertDataToIndex(
  context,
  indexName: string,
  data: { agents: any[]; apiHost },
) {
  const { agents, apiHost } = data;
  try {
    if (agents.length > 0) {
      context.fortishield.logger.debug(
        `Bulk data to index ${indexName} for ${agents.length} agents`,
      );

      const bodyBulk = agents
        .map(agent => {
          const agentInfo = { ...agent };
          agentInfo['timestamp'] = new Date(Date.now()).toISOString();
          agentInfo.host = agent.manager;
          agentInfo.cluster = {
            name: apiHost.clusterName ? apiHost.clusterName : 'disabled',
          };
          return `{ "index":  { "_index": "${indexName}" } }\n${JSON.stringify(
            agentInfo,
          )}\n`;
        })
        .join('');

      await context.core.opensearch.client.asInternalUser.bulk({
        index: indexName,
        body: bodyBulk,
      });
      context.fortishield.logger.info(
        `Bulk data to index ${indexName} for ${agents.length} agents completed`,
      );
    }
  } catch (error) {
    context.fortishield.logger.error(
      `Error inserting agent data into elasticsearch. Bulk request failed due to ${
        error.message || error
      }`,
    );
  }
}

/**
 * Create the fortishield-monitoring index
 * @param {*} context context
 * @param {String} indexName The name for the index (e.g. daily: fortishield-monitoring-YYYY.MM.DD)
 */
async function createIndex(context, indexName: string) {
  try {
    if (!MONITORING_ENABLED) return;
    const appConfig = getConfiguration();

    const IndexConfiguration = {
      settings: {
        index: {
          number_of_shards: getAppConfigurationSetting(
            'fortishield.monitoring.shards',
            appConfig,
            getSettingDefaultValue('fortishield.monitoring.shards'),
          ),
          number_of_replicas: getAppConfigurationSetting(
            'fortishield.monitoring.replicas',
            appConfig,
            getSettingDefaultValue('fortishield.monitoring.replicas'),
          ),
        },
      },
    };

    context.fortishield.logger.debug(`Creating ${indexName} index`);

    await context.core.opensearch.client.asInternalUser.indices.create({
      index: indexName,
      body: IndexConfiguration,
    });

    context.fortishield.logger.info(`${indexName} index created`);
  } catch (error) {
    context.fortishield.logger.error(
      `Could not create ${indexName} index: ${error.message || error}`,
    );
  }
}

/**
 * Wait until Kibana server is ready
 */
async function checkPluginPlatformStatus(context) {
  try {
    context.fortishield.logger.debug('Waiting for platform servers to be ready...');

    await checkElasticsearchServer(context);
    await init(context);
  } catch (error) {
    context.fortishield.logger.error(error.message || error);
    try {
      await delayAsPromise(3000);
      await checkPluginPlatformStatus(context);
    } catch (error) {}
  }
}

/**
 * Check Elasticsearch Server status and Kibana index presence
 */
async function checkElasticsearchServer(context) {
  try {
    context.fortishield.logger.debug(
      `Checking the existence of ${context.server.config.opensearchDashboards.index} index`,
    );
    const data =
      await context.core.opensearch.client.asInternalUser.indices.exists({
        index: context.server.config.opensearchDashboards.index,
      });

    return data.body;
    // TODO: check if Elasticsearch can receive requests
    // if (data) {
    //   const pluginsData = await this.server.plugins.elasticsearch.waitUntilReady();
    //   return pluginsData;
    // }
    return Promise.reject(data);
  } catch (error) {
    context.fortishield.logger.error(error.message || error);
    return Promise.reject(error);
  }
}

/**
 * Get API configuration from elastic and callback to loadCredentials
 */
async function getHostsConfiguration(context) {
  try {
    const hosts =
      await context.fortishield_core.serverAPIHostEntries.getHostsEntries();
    if (hosts.length) {
      return hosts;
    }

    context.fortishield.logger.debug('There are no API host entries yet');
    return Promise.reject({
      error: 'no credentials',
      error_code: 1,
    });
  } catch (error) {
    context.fortishield.logger.error(error.message || error);
    return Promise.reject({
      error: 'no API hosts',
      error_code: 2,
    });
  }
}

/**
 * Task used by the cron job.
 */
async function cronTask(context) {
  try {
    const templateMonitoring =
      await context.core.opensearch.client.asInternalUser.indices.getTemplate({
        name: FORTISHIELD_MONITORING_TEMPLATE_NAME,
      });

    const apiHosts = await getHostsConfiguration(context);
    const apiHostsUnique = (apiHosts || []).filter(
      (apiHost, index, self) =>
        index ===
        self.findIndex(
          t =>
            t.user === apiHost.user &&
            t.password === apiHost.password &&
            t.url === apiHost.url &&
            t.port === apiHost.port,
        ),
    );
    for (let apiHost of apiHostsUnique) {
      try {
        const { agents, apiHost: host } = await getApiInfo(context, apiHost);
        await insertMonitoringDataElasticsearch(context, {
          agents,
          apiHost: host,
        });
      } catch (error) {}
    }
  } catch (error) {
    // Retry to call itself again if Kibana index is not ready yet
    // try {
    //   if (
    //     this.wzWrapper.buildingKibanaIndex ||
    //     ((error || {}).status === 404 &&
    //       (error || {}).displayName === 'NotFound')
    //   ) {
    //     await delayAsPromise(1000);
    //     return cronTask(context);
    //   }
    // } catch (error) {} //eslint-disable-line
    context.fortishield.logger.error(error.message || error);
  }
}

/**
 * Get API and agents info
 * @param context
 * @param apiHost
 */
async function getApiInfo(context, apiHost) {
  try {
    context.fortishield.logger.debug(`Getting API info for ${apiHost.id}`);
    const responseIsCluster =
      await context.fortishield.api.client.asInternalUser.request(
        'GET',
        '/cluster/status',
        {},
        { apiHostID: apiHost.id },
      );
    const isCluster =
      (((responseIsCluster || {}).data || {}).data || {}).enabled === 'yes';
    if (isCluster) {
      const responseClusterInfo =
        await context.fortishield.api.client.asInternalUser.request(
          'GET',
          `/cluster/local/info`,
          {},
          { apiHostID: apiHost.id },
        );
      apiHost.clusterName =
        responseClusterInfo.data.data.affected_items[0].cluster;
    }
    const agents = await fetchAllAgentsFromApiHost(context, apiHost);
    return { agents, apiHost };
  } catch (error) {
    context.fortishield.logger.error(error.message || error);
    throw error;
  }
}

/**
 * Fetch all agents for the API provided
 * @param context
 * @param apiHost
 */
async function fetchAllAgentsFromApiHost(context, apiHost) {
  let agents = [];
  try {
    context.fortishield.logger.debug(`Getting all agents from ApiID: ${apiHost.id}`);
    const responseAgentsCount =
      await context.fortishield.api.client.asInternalUser.request(
        'GET',
        '/agents',
        {
          params: {
            offset: 0,
            limit: 1,
            q: 'id!=000',
          },
        },
        { apiHostID: apiHost.id },
      );

    const agentsCount = responseAgentsCount.data.data.total_affected_items;
    context.fortishield.logger.debug(
      `ApiID: ${apiHost.id}, Agent count: ${agentsCount}`,
    );

    let payload = {
      offset: 0,
      limit: 500,
      q: 'id!=000',
    };

    while (agents.length < agentsCount && payload.offset < agentsCount) {
      try {
        /*
        TODO: Improve the performance of request with:
          - Reduce the number of requests to the Fortishield API
          - Reduce (if possible) the quantity of data to index by document

        Requirements:
          - Research about the neccesary data to index.

        How to do:
          - Fortishield API request:
            - select the required data to retrieve depending on is required to index (using the `select` query param)
            - increase the limit of results to retrieve (currently, the requests use the recommended value: 500).
              See the allowed values. This depends on the selected data because the response could fail if contains a lot of data
        */
        const responseAgents =
          await context.fortishield.api.client.asInternalUser.request(
            'GET',
            `/agents`,
            { params: payload },
            { apiHostID: apiHost.id },
          );
        agents = [...agents, ...responseAgents.data.data.affected_items];
        payload.offset += payload.limit;
      } catch (error) {
        context.fortishield.logger.error(
          `ApiID: ${apiHost.id}, Error request with offset/limit ${
            payload.offset
          }/${payload.limit}: ${error.message || error}`,
        );
      }
    }
    return agents;
  } catch (error) {
    context.fortishield.logger.error(
      `ApiID: ${apiHost.id}. Error: ${error.message || error}`,
    );
    throw error;
  }
}

/**
 * Start the cron job
 */
export async function jobMonitoringRun(context) {
  context.fortishield.logger.debug('Task:Monitoring initializing');
  // Init the monitoring variables
  initMonitoringConfiguration(context);
  // Check Kibana index and if it is prepared, start the initialization of Fortishield App.
  await checkPluginPlatformStatus(context);
  // // Run the cron job only it it's enabled
  if (MONITORING_ENABLED) {
    cronTask(context);
    cron.schedule(MONITORING_CRON_FREQ, () => cronTask(context));
  }
}

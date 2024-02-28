/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
  CoreSetup,
  CoreStart,
  Logger,
  Plugin,
  PluginInitializerContext,
  SharedGlobalConfig,
} from 'opensearch_dashboards/server';

import { FortishieldPluginSetup, FortishieldPluginStart, PluginSetup } from './types';
import { setupRoutes } from './routes';
import {
  jobInitializeRun,
  jobMonitoringRun,
  jobSchedulerRun,
  jobQueueRun,
  jobMigrationTasksRun,
} from './start';
import { first } from 'rxjs/operators';

declare module 'opensearch_dashboards/server' {
  interface RequestHandlerContext {
    fortishield: {
      logger: Logger;
      plugins: PluginSetup;
      security: any;
      api: {
        client: {
          asInternalUser: {
            authenticate: (apiHostID: string) => Promise<string>;
            request: (
              method: string,
              path: string,
              data: any,
              options: { apiHostID: string; forceRefresh?: boolean },
            ) => Promise<any>;
          };
          asCurrentUser: {
            authenticate: (apiHostID: string) => Promise<string>;
            request: (
              method: string,
              path: string,
              data: any,
              options: { apiHostID: string; forceRefresh?: boolean },
            ) => Promise<any>;
          };
        };
      };
    };
  }
}

export class FortishieldPlugin implements Plugin<FortishieldPluginSetup, FortishieldPluginStart> {
  private readonly logger: Logger;

  constructor(private readonly initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public async setup(core: CoreSetup, plugins: PluginSetup) {
    this.logger.debug('Fortishield-wui: Setup');

    const serverInfo = core.http.getServerInfo();

    core.http.registerRouteHandlerContext('fortishield', (context, request) => {
      return {
        // Create a custom logger with a tag composed of HTTP method and path endpoint
        logger: this.logger.get(
          `${request.route.method.toUpperCase()} ${request.route.path}`,
        ),
        server: {
          info: serverInfo,
        },
        plugins,
        security: plugins.fortishieldCore.dashboardSecurity,
        api: context.fortishield_core.api,
      };
    });

    // Add custom headers to the responses
    core.http.registerOnPreResponse((request, response, toolkit) => {
      const additionalHeaders = {
        'x-frame-options': 'sameorigin',
      };
      return toolkit.next({ headers: additionalHeaders });
    });

    // Routes
    const router = core.http.createRouter();
    setupRoutes(router);

    return {};
  }

  public async start(core: CoreStart, plugins: any) {
    const globalConfiguration: SharedGlobalConfig =
      await this.initializerContext.config.legacy.globalConfig$
        .pipe(first())
        .toPromise();

    const contextServer = {
      config: globalConfiguration,
    };

    // Initialize
    jobInitializeRun({
      core,
      fortishield: {
        logger: this.logger.get('initialize'),
        api: plugins.fortishieldCore.api,
      },
      fortishield_core: plugins.fortishieldCore,
      server: contextServer,
    });

    // Migration tasks
    jobMigrationTasksRun({
      core,
      fortishield: {
        logger: this.logger.get('migration-task'),
        api: plugins.fortishieldCore.api,
      },
      fortishield_core: plugins.fortishieldCore,
      server: contextServer,
    });

    // Monitoring
    jobMonitoringRun({
      core,
      fortishield: {
        logger: this.logger.get('monitoring'),
        api: plugins.fortishieldCore.api,
      },
      fortishield_core: plugins.fortishieldCore,
      server: contextServer,
    });

    // Scheduler
    jobSchedulerRun({
      core,
      fortishield: {
        logger: this.logger.get('cron-scheduler'),
        api: plugins.fortishieldCore.api,
      },
      fortishield_core: plugins.fortishieldCore,
      server: contextServer,
    });

    // Queue
    jobQueueRun({
      core,
      fortishield: {
        logger: this.logger.get('queue'),
        api: plugins.fortishieldCore.api,
      },
      fortishield_core: plugins.fortishieldCore,
      server: contextServer,
    });
    return {};
  }

  public stop() {}
}

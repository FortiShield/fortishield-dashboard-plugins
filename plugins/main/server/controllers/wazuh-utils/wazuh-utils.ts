/*
 * Wazuh app - Class for Wazuh-API functions
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Require some libraries
import { ErrorResponse } from '../../lib/error-response';
import {
  OpenSearchDashboardsRequest,
  RequestHandlerContext,
  OpenSearchDashboardsResponseFactory,
} from 'src/core/server';
import fs from 'fs';
import path from 'path';
import { createDirectoryIfNotExists } from '../../lib/filesystem';
import glob from 'glob';
import { getFileExtensionFromBuffer } from '../../../common/services/file-extension';
import { routeDecoratorProtectedAdministrator } from '../decorators';

// TODO: these controllers have no logs. We should include them.
export class WazuhUtilsCtrl {
  /**
   * Constructor
   * @param {*} server
   */
  constructor() {}

  /**
   * Get the configuration excluding the API hosts configuration
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object}
   */
  async getConfiguration(
    context: RequestHandlerContext,
    request: OpenSearchDashboardsRequest,
    response: OpenSearchDashboardsResponseFactory,
  ) {
    try {
      context.wazuh.logger.debug('Getting configuration');
      const configuration = await context.wazuh_core.configuration.get();
      // Exclude the API host configuration
      const { hosts, ...rest } = configuration;
      context.wazuh.logger.debug(
        `Configuration: ${JSON.stringify(configuration)}`,
      );
      return response.ok({
        body: {
          statusCode: 200,
          error: 0,
          data: rest,
        },
      });
    } catch (error) {
      return ErrorResponse(error.message || error, 3019, 500, response);
    }
  }

  /**
   * Clear the configuration
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object}
   */
  clearConfiguration = routeDecoratorProtectedAdministrator(
    async (
      context: RequestHandlerContext,
      request: OpenSearchDashboardsRequest,
      response: OpenSearchDashboardsResponseFactory,
    ) => {
      context.wazuh.logger.debug('Clearing configuration');
      await context.wazuh_core.configuration.clear();
      return response.ok({
        body: {
          message: 'Configuration was cleared',
        },
      });
    },
    3020,
  );

  /**
   * Update the configuration
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object}
   */
  updateConfiguration = routeDecoratorProtectedAdministrator(
    async (
      context: RequestHandlerContext,
      request: OpenSearchDashboardsRequest,
      response: OpenSearchDashboardsResponseFactory,
    ) => {
      // TODO: add validation of body
      let requiresRunningHealthCheck = false,
        requiresReloadingBrowserTab = false,
        requiresRestartingPluginPlatform = false;

      context.wazuh.logger.debug(
        `Updating configuration: ${JSON.stringify(request.body)}`,
      );

      const updatedSettings = {
        ...request.body,
      };
      context.wazuh.logger.debug(
        `Updating configuration with ${JSON.stringify(updatedSettings)}`,
      );
      const pluginSettings = await context.wazuh_core.configuration.set(
        updatedSettings,
      );
      context.wazuh.logger.debug('Configuration updated');

      // TODO: this doesn't support the update of hosts
      requiresRunningHealthCheck =
        Object.keys(request.body).some((pluginSettingKey: string) =>
          Boolean(
            context.wazuh_core.configuration._settings.get(pluginSettingKey)
              .requiresRunningHealthCheck,
          ),
        ) || requiresRunningHealthCheck;
      requiresReloadingBrowserTab =
        Object.keys(request.body).some((pluginSettingKey: string) =>
          Boolean(
            context.wazuh_core.configuration._settings.get(pluginSettingKey)
              .requiresReloadingBrowserTab,
          ),
        ) || requiresReloadingBrowserTab;
      requiresRestartingPluginPlatform =
        Object.keys(request.body).some((pluginSettingKey: string) =>
          Boolean(
            context.wazuh_core.configuration._settings.get(pluginSettingKey)
              .requiresRestartingPluginPlatform,
          ),
        ) || requiresRestartingPluginPlatform;

      return response.ok({
        body: {
          data: {
            requiresRunningHealthCheck,
            requiresReloadingBrowserTab,
            requiresRestartingPluginPlatform,
            updatedConfiguration: pluginSettings,
          },
        },
      });
    },
    3021,
  );

  /**
   * Upload a file
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Configuration File or ErrorResponse
   */
  uploadFile = routeDecoratorProtectedAdministrator(
    async (
      context: RequestHandlerContext,
      request: KibanaRequest,
      response: KibanaResponseFactory,
    ) => {
      const { key } = request.params;
      const { file: bufferFile } = request.body;

      const pluginSetting = context.wazuh_core.configuration._settings.get(key);

      // Check file extension
      const fileExtension = getFileExtensionFromBuffer(bufferFile);

      // Check if the extension is valid for the setting.
      if (
        !pluginSetting.options.file.extensions.includes(`.${fileExtension}`)
      ) {
        return response.badRequest({
          body: `File extension is not valid for setting [${key}] setting. Allowed file extensions: ${pluginSetting.options.file.extensions.join(
            ', ',
          )}`,
        });
      }

      const fileNamePath = `${key}.${fileExtension}`;

      // Create target directory
      const targetDirectory = path.join(
        __dirname,
        '../../..',
        pluginSetting.options.file.store.relativePathFileSystem,
      );
      context.wazuh.logger.debug(`Directory: ${targetDirectory}`);
      createDirectoryIfNotExists(targetDirectory);
      // Get the files related to the setting and remove them
      const files = glob.sync(path.join(targetDirectory, `${key}.*`));
      context.wazuh.logger.debug(
        `Removing previous files: ${files.join(', ')}`,
      );
      files.forEach(fs.unlinkSync);

      // Store the file in the target directory.
      const storeFilePath = path.join(targetDirectory, fileNamePath);
      context.wazuh.logger.debug(`Storing file on : ${files.join(', ')}`);
      fs.writeFileSync(storeFilePath, bufferFile);

      // Update the setting in the configuration cache
      const pluginSettingValue =
        pluginSetting.options.file.store.resolveStaticURL(fileNamePath);
      const updatedConfiguration = {
        [key]: pluginSettingValue,
      };
      await context.wazuh_core.configuration.set(updatedConfiguration);

      return response.ok({
        body: {
          data: {
            requiresRunningHealthCheck: Boolean(
              pluginSetting.requiresRunningHealthCheck,
            ),
            requiresReloadingBrowserTab: Boolean(
              pluginSetting.requiresReloadingBrowserTab,
            ),
            requiresRestartingPluginPlatform: Boolean(
              pluginSetting.requiresRestartingPluginPlatform,
            ),
            updatedConfiguration,
          },
        },
      });
    },
    3022,
  );

  /**
   * Delete a file
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Configuration File or ErrorResponse
   */
  deleteFile = routeDecoratorProtectedAdministrator(
    async (
      context: RequestHandlerContext,
      request: KibanaRequest,
      response: KibanaResponseFactory,
    ) => {
      const { key } = request.params;
      const pluginSetting = context.wazuh_core.configuration._settings.get(key);

      // Get the files related to the setting and remove them
      const targetDirectory = path.join(
        __dirname,
        '../../..',
        pluginSetting.options.file.store.relativePathFileSystem,
      );
      context.wazuh.logger.debug(`Directory: ${targetDirectory}`);
      const files = glob.sync(path.join(targetDirectory, `${key}.*`));
      context.wazuh.logger.debug(
        `Removing previous files: ${files.join(', ')}`,
      );
      files.forEach(fs.unlinkSync);

      // Update the setting in the configuration cache
      const pluginSettingValue = pluginSetting.defaultValue;
      const updatedConfiguration = {
        [key]: pluginSettingValue,
      };
      await context.wazuh_core.configuration.clear(key);

      return response.ok({
        body: {
          message:
            'All files were removed and the configuration file was updated.',
          data: {
            requiresRunningHealthCheck: Boolean(
              pluginSetting.requiresRunningHealthCheck,
            ),
            requiresReloadingBrowserTab: Boolean(
              pluginSetting.requiresReloadingBrowserTab,
            ),
            requiresRestartingPluginPlatform: Boolean(
              pluginSetting.requiresRestartingPluginPlatform,
            ),
            updatedConfiguration,
          },
        },
      });
    },
    3023,
  );

  /**
   * Get if the current user is an administror
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Configuration File or ErrorResponse
   */
  async accountIsAdministrator(
    context: RequestHandlerContext,
    request: KibanaRequest,
    response: KibanaResponseFactory,
  ) {
    try {
      await context.wazuh_core.dashboardSecurity.isAdministratorUser(
        context,
        request,
      );
      return response.ok({
        body: {
          is_admin: true,
        },
      });
    } catch (error) {
      return response.ok({
        body: {
          is_admin: false,
          message: error.message,
        },
      });
    }
  }
}

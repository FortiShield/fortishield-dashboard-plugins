import { PLUGIN_PLATFORM_BASE_INSTALLATION_PATH } from './constants';

// TODO: review if this service is not used and remove
/**
 *
 * @param path Path to file or directory
 * @returns Absolute path to the file or directory with the prefix path of app data path
 */
export const getPluginDataPath = (path: string = ''): string =>
  `${PLUGIN_PLATFORM_BASE_INSTALLATION_PATH}${path}`;

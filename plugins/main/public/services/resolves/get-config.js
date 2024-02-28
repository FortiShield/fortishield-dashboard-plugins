/*
 * Fortishield app - Resolve function to parse configuration file
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { getSettingsDefault } from '../../../common/services/settings';

export async function getWzConfig($q, genericReq, fortishieldConfig) {
  const defaultConfig = getSettingsDefault();

  try {
    const config = await genericReq.request('GET', '/utils/configuration', {});

    if (!config || !config.data || !config.data.data)
      throw new Error('No config available');

    const ymlContent = config.data.data;

    if (
      typeof ymlContent === 'object' &&
      (Object.keys(ymlContent) || []).length
    ) {
      // Replace default values with custom values from fortishield.yml file
      for (const key in ymlContent) {
        defaultConfig[key] = ymlContent[key];
      }
    }

    fortishieldConfig.setConfig(defaultConfig);
  } catch (error) {
    fortishieldConfig.setConfig(defaultConfig);
    console.log('Error parsing fortishield.yml, using default values.'); // eslint-disable-line
    console.log(error.message || error); // eslint-disable-line
  }
  return $q.resolve(defaultConfig);
}

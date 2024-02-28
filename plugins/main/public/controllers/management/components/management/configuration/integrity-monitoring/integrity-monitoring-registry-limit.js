/*
 * Fortishield app - React component for show configuration of integrity monitoring - synchronization tab.
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component, Fragment } from 'react';

import WzConfigurationSettingsHeader from '../util-components/configuration-settings-header';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';
import helpLinks from './help-links';
import { renderValueYesThenEnabled } from '../utils/utils';

const mainSettings = [
  {
    field: 'enabled',
    label: 'File limit status',
    render: renderValueYesThenEnabled
  },
  {
    field: 'entries',
    label: 'Maximum number of registries values to monitor'
  }
];

const FILE_LIMIT_PROP = 'registry_limit'

class WzConfigurationIntegrityMonitoringFileLimit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig &&
        currentConfig['syscheck-syscheck'] &&
        currentConfig['syscheck-syscheck'].syscheck &&
        currentConfig['syscheck-syscheck'].syscheck[FILE_LIMIT_PROP] ? (
          <WzConfigurationSettingsHeader
            title="Entries limit"
            description="Limit the maximum entries in the FIM database"
            help={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={
                currentConfig['syscheck-syscheck'].syscheck[FILE_LIMIT_PROP]
              }
              items={mainSettings}
            />
          </WzConfigurationSettingsHeader>
        ) : (
          <WzNoConfig error="not-present" help={helpLinks} />
        )}
      </Fragment>
    );
  }
}

export default WzConfigurationIntegrityMonitoringFileLimit;

/*
 * Fortishield app - GitHub Panel tab - Drilldown layout configuration
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React from 'react';
import { VisCard } from '../../../common/modules/panel/';
import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import { SecurityAlerts } from '../../../visualize/components';

export const DrilldownConfigRepository = {
  rows: [
    {
      height: 300,
      columns: [
        {
          width: 30,
          component: (props) => (
            <VisCard id="Fortishield-App-Overview-GitHub-Top-Ten-Actions" tab="github" {...props} />
          ),
        },
        {
          width: 30,
          component: (props) => (
            <VisCard id="Fortishield-App-Overview-GitHub-Top-Ten-Actors" tab="github" {...props} />
          ),
        },
        {
          width: 30,
          component: (props) => (
            <VisCard id="Fortishield-App-Overview-GitHub-Top-Ten-Organizations" tab="github" {...props} />
          ),
        },
      ],
    },
    {
      height: 300,
      columns: [
        {
          width: 50,
          component: (props) => (
            <VisCard id="Fortishield-App-Overview-GitHub-Countries" tab="github" {...props} />
          ),
        },
        {
          width: 50,
          component: (props) => (
            <VisCard id="Fortishield-App-Overview-GitHub-Alert-Level-Evolution" tab="github" {...props} />
          ),
        },
      ],
    },
    {
      columns: [
        {
          width: 100,
          component: () => (
            <EuiFlexItem>
              <EuiPanel paddingSize={'s'}>
                <SecurityAlerts
                  initialColumns={[
                    { field: 'icon' },
                    { field: 'timestamp' },
                    { field: 'rule.description' },
                    { field: 'data.github.org', label: 'Organization' },
                    { field: 'data.github.actor', label: 'Actor' },
                    { field: 'data.github.action', label: 'Action' },
                    { field: 'rule.level' },
                    { field: 'rule.id' },
                  ]}
                />
              </EuiPanel>
            </EuiFlexItem>
          ),
        },
      ],
    },
  ],
};

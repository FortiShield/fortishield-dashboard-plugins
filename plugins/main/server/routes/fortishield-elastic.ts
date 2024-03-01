/*
 * Fortishield app - Module for Fortishield-Elastic routes
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { FortishieldElasticCtrl } from '../controllers';
import { IRouter } from 'opensearch_dashboards/server';
import { schema } from '@osd/config-schema';
import { FORTISHIELD_SAMPLE_ALERTS_CATEGORY_SECURITY, FORTISHIELD_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING, FORTISHIELD_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION } from '../../common/constants';

export function FortishieldElasticRoutes(router: IRouter) {
  const ctrl = new FortishieldElasticCtrl();
  const schemaSampleAlertsCategories = schema.oneOf([
    FORTISHIELD_SAMPLE_ALERTS_CATEGORY_SECURITY,
    FORTISHIELD_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING,
    FORTISHIELD_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION
  ].map(category => schema.literal(category)));

  // Endpoints
  router.get(
    {
      path: '/elastic/security/current-platform',
      validate: false,
    },
    async (context, request, response) => ctrl.getCurrentPlatform(context, request, response)
  );

  router.get(
    {
      path: '/elastic/visualizations/{tab}/{pattern}',
      validate: {
        params: schema.object({
          tab: schema.string(),
          pattern: schema.string(),
        }),
      }
    },
    async (context, request, response) => ctrl.createVis(context, request, response)
  );

  router.post(
    {
      path: '/elastic/visualizations/{tab}/{pattern}',
      validate: {
        params: schema.object({
          tab: schema.string(),
          pattern: schema.string(),
        }),
        body: schema.any()
      }
    },
    async (context, request, response) => ctrl.createClusterVis(context, request, response)
  );

  router.get(
    {
      path: '/elastic/template/{pattern}',
      validate: {
        params: schema.object({
          pattern: schema.string(),
        })
      }
    },
    async (context, request, response) => ctrl.getTemplate(context, request, response)
  );

  router.get(
    {
      path: '/elastic/top/{mode}/{cluster}/{field}/{pattern}',
      validate: {
        params: schema.object({
          mode: schema.string(),
          cluster: schema.string(),
          field: schema.string(),
          pattern: schema.string(),
        }),
        query: schema.object({
          agentsList: schema.string(),
        })
      }
    },
    async (context, request, response) => ctrl.getFieldTop(context, request, response)
  );

  router.get(
    {
      path: '/elastic/samplealerts',
      validate: false,
    },
    async (context, request, response) => ctrl.haveSampleAlerts(context, request, response)
  );

  router.get(
    {
      path: '/elastic/samplealerts/{category}',
      validate: {
        params: schema.object({
          category: schemaSampleAlertsCategories,
        })
      },
    },
    async (context, request, response) => ctrl.haveSampleAlertsOfCategory(context, request, response)
  );

  router.post(
    {
      path: '/elastic/samplealerts/{category}',
      validate: {
        params: schema.object({
          category: schemaSampleAlertsCategories,
        }),
        body: schema.any()
      },
    },
    async (context, request, response) => ctrl.createSampleAlerts(context, request, response)
  );

  router.delete(
    {
      path: '/elastic/samplealerts/{category}',
      validate: {
        params: schema.object({
          category: schemaSampleAlertsCategories,
        })
      },
    },
    async (context, request, response) => ctrl.deleteSampleAlerts(context, request, response)
  );

  router.post(
    {
      path: '/elastic/alerts',
      validate: {
        body: schema.any(),
      }
    },
    async (context, request, response) => ctrl.alerts(context, request, response)
  );

  router.get(
    {
      path: '/elastic/statistics',
      validate: false
    },
    async (context, request, response) => ctrl.existStatisticsIndices(context, request, response)
  );
}
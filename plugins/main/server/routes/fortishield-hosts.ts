/*
 * Fortishield app - Module for Fortishield-API routes
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { FortishieldHostsCtrl } from '../controllers';
import { IRouter } from 'opensearch_dashboards/server';
import { schema } from '@osd/config-schema';

export function FortishieldHostsRoutes(router: IRouter) {
  const ctrl = new FortishieldHostsCtrl();

  // Get Fortishield-API entries list (Multimanager) from elasticsearch index
  router.get({
      path: '/hosts/apis',
      validate: false
    },
    async (context, request, response) => ctrl.getHostsEntries(context, request, response)
  );

  // Updates the cluster-info or manager-info
  router.put(
    {
      path: '/hosts/update-hostname/{id}',
      validate: {
        params: schema.object({
          id: schema.string()
        }),
        body: schema.object({
          cluster_info: schema.any()
        })
      }
    },
    async (context, request, response) => ctrl.updateClusterInfo(context, request, response)
  )

  // Checks the orphan hosts in the registry in order to delete them
  router.post(
    {
      path: '/hosts/remove-orphan-entries',
      validate: {
        body: schema.object({
          entries: schema.arrayOf(schema.any())
        })
      }
    },
    async (context, request, response) => ctrl.removeOrphanEntries(context, request, response)
  )
}

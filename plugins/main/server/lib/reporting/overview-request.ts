/*
 * Fortishield app - Specific methods to fetch Fortishield overview data from Elasticsearch
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { Base } from './base-query';
import { getSettingDefaultValue } from '../../../common/services/settings';

/**
 * Returns top 3 agents with level 15 alerts
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: fortishield AND rule.groups: vulnerability
 * @returns {Array<String>} E.g:['000','130','300']
 */
export const topLevel15 = async (context, gte, lte, filters, allowedAgentsFilter, pattern = getSettingDefaultValue('pattern')) => {
  try {
    const base = {};

    Object.assign(base, Base(pattern, filters, gte, lte, allowedAgentsFilter));

    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'agent.id',
          size: 3,
          order: {
            _count: 'desc'
          }
        }
      }
    });

    base.query.bool.must.push({
      match_phrase: {
        'rule.level': {
          query: 15
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const { buckets } = response.body.aggregations['2'];

    return buckets.map(item => item.key);
  } catch (error) {
    return Promise.reject(error);
  }
}

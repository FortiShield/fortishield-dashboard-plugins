import {
  CoreStart,
  ISavedObjectsRepository,
} from 'opensearch-dashboards/server';
import { createGetterSetter } from '../../../src/plugins/opensearch_dashboards_utils/common';
import { FortishieldCorePluginStart } from '../../fortishield-core/server';

export const [getInternalSavedObjectsClient, setInternalSavedObjectsClient] =
  createGetterSetter<ISavedObjectsRepository>('SavedObjectsRepository');
export const [getCore, setCore] = createGetterSetter<CoreStart>('Core');
export const [getFortishieldCore, setFortishieldCore] =
  createGetterSetter<FortishieldCorePluginStart>('FortishieldCore');
export const [getFortishieldCheckUpdatesServices, setFortishieldCheckUpdatesServices] =
  createGetterSetter<any>('FortishieldCheckUpdatesServices');

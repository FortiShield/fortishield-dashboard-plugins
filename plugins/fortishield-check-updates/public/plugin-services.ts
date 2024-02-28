import { CoreStart } from 'opensearch-dashboards/public';
import { createGetterSetter } from '../../../src/plugins/opensearch_dashboards_utils/common';
import { FortishieldCorePluginStart } from '../../fortishield-core/public';

export const [getCore, setCore] = createGetterSetter<CoreStart>('Core');
export const [getFortishieldCore, setFortishieldCore] =
  createGetterSetter<FortishieldCorePluginStart>('FortishieldCore');

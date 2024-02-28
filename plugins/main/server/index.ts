import { PluginInitializerContext } from 'opensearch_dashboards/server';

import { FortishieldPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, plugin platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new FortishieldPlugin(initializerContext);
}

export { FortishieldPluginSetup, FortishieldPluginStart } from './types';

import { PluginInitializerContext } from '../../../src/core/server';
import { FortishieldEndpointsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new FortishieldEndpointsPlugin(initializerContext);
}

export { FortishieldEndpointsPluginSetup, FortishieldEndpointsPluginStart } from './types';

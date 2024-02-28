import { PluginInitializerContext } from '../../../src/core/server';
import { FortishieldCorePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new FortishieldCorePlugin(initializerContext);
}

export { FortishieldCorePluginSetup, FortishieldCorePluginStart } from './types';

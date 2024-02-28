import { FortishieldCorePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new FortishieldCorePlugin();
}
export { FortishieldCorePluginSetup, FortishieldCorePluginStart } from './types';

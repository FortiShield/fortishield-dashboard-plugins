import { FortishieldCheckUpdatesPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new FortishieldCheckUpdatesPlugin();
}
export { FortishieldCheckUpdatesPluginSetup, FortishieldCheckUpdatesPluginStart } from './types';

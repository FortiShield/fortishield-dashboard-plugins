import { PluginInitializer, PluginInitializerContext } from 'opensearch_dashboards/public';
import { FortishieldPlugin } from './plugin';
import { FortishieldSetup, FortishieldSetupPlugins, FortishieldStart, FortishieldStartPlugins } from './types';

export const plugin: PluginInitializer<FortishieldSetup, FortishieldStart, FortishieldSetupPlugins, FortishieldStartPlugins> = (
  initializerContext: PluginInitializerContext
) => {
  return new FortishieldPlugin(initializerContext);
};

// These are your public types & static code
export { FortishieldSetup, FortishieldStart };

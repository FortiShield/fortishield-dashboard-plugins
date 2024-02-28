import { CoreSetup, CoreStart, Plugin } from 'opensearch-dashboards/public';
import {
  AppPluginStartDependencies,
  FortishieldEndpointsPluginSetup,
  FortishieldEndpointsPluginStart,
} from './types';

export class FortishieldEndpointsPlugin
  implements Plugin<FortishieldEndpointsPluginSetup, FortishieldEndpointsPluginStart>
{
  public setup(core: CoreSetup): FortishieldEndpointsPluginSetup {
    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): FortishieldEndpointsPluginStart {
    return {};
  }

  public stop() {}
}

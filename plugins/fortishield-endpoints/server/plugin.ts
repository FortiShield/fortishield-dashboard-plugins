import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from 'opensearch-dashboards/server';

import {
  PluginSetup,
  FortishieldEndpointsPluginSetup,
  FortishieldEndpointsPluginStart,
  AppPluginStartDependencies,
} from './types';

export class FortishieldEndpointsPlugin
  implements Plugin<FortishieldEndpointsPluginSetup, FortishieldEndpointsPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public async setup(core: CoreSetup, plugins: PluginSetup) {
    this.logger.debug('fortishield_endpoints: Setup');

    return {};
  }

  public start(core: CoreStart, plugins: AppPluginStartDependencies): FortishieldEndpointsPluginStart {
    this.logger.debug('fortishield_endpoints: Started');

    return {};
  }

  public stop() {}
}

import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from 'opensearch-dashboards/server';

import {
  PluginSetup,
  FortishieldCheckUpdatesPluginSetup,
  FortishieldCheckUpdatesPluginStart,
  AppPluginStartDependencies,
} from './types';
import { defineRoutes } from './routes';
import {
  availableUpdatesObject,
  userPreferencesObject,
} from './services/saved-object/types';
import {
  setCore,
  setFortishieldCore,
  setInternalSavedObjectsClient,
  setFortishieldCheckUpdatesServices,
} from './plugin-services';
import { ISecurityFactory } from '../../fortishield-core/server/services/security-factory';

declare module 'opensearch-dashboards/server' {
  interface RequestHandlerContext {
    fortishield_check_updates: {
      logger: Logger;
      security: ISecurityFactory;
    };
  }
}

export class FortishieldCheckUpdatesPlugin
  implements Plugin<FortishieldCheckUpdatesPluginSetup, FortishieldCheckUpdatesPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public async setup(core: CoreSetup, plugins: PluginSetup) {
    this.logger.debug('fortishield_check_updates: Setup');

    setFortishieldCore(plugins.fortishieldCore);
    setFortishieldCheckUpdatesServices({ logger: this.logger });

    core.http.registerRouteHandlerContext('fortishield_check_updates', () => {
      return {
        logger: this.logger,
        security: plugins.fortishieldCore.dashboardSecurity,
      };
    });

    const router = core.http.createRouter();

    // Register saved objects types
    core.savedObjects.registerType(availableUpdatesObject);
    core.savedObjects.registerType(userPreferencesObject);

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): FortishieldCheckUpdatesPluginStart {
    this.logger.debug('fortishieldCheckUpdates: Started');

    const internalSavedObjectsClient =
      core.savedObjects.createInternalRepository();
    setCore(core);

    setInternalSavedObjectsClient(internalSavedObjectsClient);

    return {};
  }

  public stop() {}
}

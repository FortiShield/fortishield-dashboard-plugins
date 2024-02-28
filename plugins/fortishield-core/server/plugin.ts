import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from 'opensearch-dashboards/server';

import {
  PluginSetup,
  FortishieldCorePluginSetup,
  FortishieldCorePluginStart,
} from './types';
import { setCore } from './plugin-services';
import {
  CacheAPIUserAllowRunAs,
  ManageHosts,
  createDashboardSecurity,
  ServerAPIClient,
  ServerAPIHostEntries,
  UpdateConfigurationFile,
  UpdateRegistry,
} from './services';

export class FortishieldCorePlugin
  implements Plugin<FortishieldCorePluginSetup, FortishieldCorePluginStart>
{
  private readonly logger: Logger;
  private services: { [key: string]: any };

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
    this.services = {};
  }

  public async setup(
    core: CoreSetup,
    plugins: PluginSetup,
  ): Promise<FortishieldCorePluginSetup> {
    this.logger.debug('fortishield_core: Setup');

    this.services.dashboardSecurity = createDashboardSecurity(plugins);

    this.services.updateRegistry = new UpdateRegistry(
      this.logger.get('update-registry'),
    );

    this.services.manageHosts = new ManageHosts(
      this.logger.get('manage-hosts'),
      this.services.updateRegistry,
    );

    this.services.serverAPIClient = new ServerAPIClient(
      this.logger.get('server-api-client'),
      this.services.manageHosts,
      this.services.dashboardSecurity,
    );

    this.services.cacheAPIUserAllowRunAs = new CacheAPIUserAllowRunAs(
      this.logger.get('api-user-allow-run-as'),
      this.services.manageHosts,
      this.services.serverAPIClient,
    );

    this.services.serverAPIHostEntries = new ServerAPIHostEntries(
      this.logger.get('server-api-host-entries'),
      this.services.manageHosts,
      this.services.updateRegistry,
      this.services.cacheAPIUserAllowRunAs,
    );

    this.services.updateConfigurationFile = new UpdateConfigurationFile(
      this.logger.get('update-configuration-file'),
    );

    // Register a property to the context parameter of the endpoint handlers
    core.http.registerRouteHandlerContext('fortishield_core', (context, request) => {
      return {
        ...this.services,
        api: {
          client: {
            asInternalUser: this.services.serverAPIClient.asInternalUser,
            asCurrentUser: this.services.serverAPIClient.asScoped(
              context,
              request,
            ),
          },
        },
      };
    });

    return {
      ...this.services,
      api: {
        client: {
          asInternalUser: this.services.serverAPIClient.asInternalUser,
          asScoped: this.services.serverAPIClient.asScoped,
        },
      },
    };
  }

  public start(core: CoreStart): FortishieldCorePluginStart {
    this.logger.debug('fortishieldCore: Started');

    setCore(core);

    return {
      ...this.services,
      api: {
        client: {
          asInternalUser: this.services.serverAPIClient.asInternalUser,
          asScoped: this.services.serverAPIClient.asScoped,
        },
      },
    };
  }

  public stop() {}
}

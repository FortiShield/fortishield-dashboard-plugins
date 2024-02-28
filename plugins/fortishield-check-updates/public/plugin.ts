import { CoreSetup, CoreStart, Plugin } from 'opensearch-dashboards/public';
import {
  AppPluginStartDependencies,
  FortishieldCheckUpdatesPluginSetup,
  FortishieldCheckUpdatesPluginStart,
} from './types';
import { UpdatesNotification } from './components/updates-notification';
import { DismissNotificationCheck } from './components/dismiss-notification-check';
import { setCore, setFortishieldCore } from './plugin-services';
import { getAvailableUpdates } from './services';

export class FortishieldCheckUpdatesPlugin
  implements Plugin<FortishieldCheckUpdatesPluginSetup, FortishieldCheckUpdatesPluginStart> {
  public setup(core: CoreSetup): FortishieldCheckUpdatesPluginSetup {
    return {};
  }

  public start(core: CoreStart, plugins: AppPluginStartDependencies): FortishieldCheckUpdatesPluginStart {
    setCore(core);
    setFortishieldCore(plugins.fortishieldCore);

    return {
      UpdatesNotification,
      getAvailableUpdates,
      DismissNotificationCheck,
    };
  }

  public stop() {}
}

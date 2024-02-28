import { FortishieldCorePluginStart } from '../../fortishield-core/public';
import { AvailableUpdates } from '../common/types';

export interface FortishieldCheckUpdatesPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FortishieldCheckUpdatesPluginStart {
  UpdatesNotification: () => JSX.Element | null;
  getAvailableUpdates: (
    queryApi: boolean,
    forceQuery: boolean,
  ) => Promise<AvailableUpdates>;
  DismissNotificationCheck: () => JSX.Element | null;
}

export interface AppPluginStartDependencies {
  fortishieldCore: FortishieldCorePluginStart;
}

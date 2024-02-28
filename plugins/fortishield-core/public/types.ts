import { API_USER_STATUS_RUN_AS } from '../common/api-user-status-run-as';

export interface FortishieldCorePluginSetup {
  utils: { formatUIDate: (date: Date) => string };
  API_USER_STATUS_RUN_AS: API_USER_STATUS_RUN_AS;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FortishieldCorePluginStart {
  hooks: { useDockedSideNav: () => boolean };
  utils: { formatUIDate: (date: Date) => string };
  API_USER_STATUS_RUN_AS: API_USER_STATUS_RUN_AS;
}

export interface AppPluginStartDependencies {}

import { ISecurityFactory } from '../../fortishield-core/server/services/security-factory';
import { FortishieldCorePluginStart } from '../../fortishield-core/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppPluginStartDependencies {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FortishieldCheckUpdatesPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FortishieldCheckUpdatesPluginStart {}

export type PluginSetup = {
  securityDashboards?: {}; // TODO: Add OpenSearch Dashboards Security interface
  fortishieldCore: { dashboardSecurity: ISecurityFactory };
};

export interface AppPluginStartDependencies {
  fortishieldCore: FortishieldCorePluginStart;
}

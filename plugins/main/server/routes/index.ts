import { IRouter } from 'opensearch_dashboards/server';
import { FortishieldApiRoutes } from './fortishield-api';
import { FortishieldElasticRoutes } from "./fortishield-elastic";
import { FortishieldHostsRoutes } from "./fortishield-hosts";
import { FortishieldUtilsRoutes, UiLogsRoutes } from './fortishield-utils'
import { FortishieldReportingRoutes } from "./fortishield-reporting";

export const setupRoutes = (router: IRouter) => {
    FortishieldApiRoutes(router);
    FortishieldElasticRoutes(router);
    FortishieldHostsRoutes(router);
    FortishieldUtilsRoutes(router);
    FortishieldReportingRoutes(router);
    UiLogsRoutes(router);
};

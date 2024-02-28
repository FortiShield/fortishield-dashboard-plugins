/*
 * Fortishield app - File for routes definition
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Require routes
//import routes from 'ui/routes';
import 'angular-route';

// Functions to be executed before loading certain routes
import { settingsWizard, getSavedSearch, getIp, getWzConfig } from './resolves';

// HTML templates
import healthCheckTemplate from '../templates/health-check/health-check.html';
import agentsTemplate from '../templates/agents/dashboards.html';
import agentDeployTemplate from '../templates/agents/deploy/agent-deploy.html';
import agentsPrevTemplate from '../templates/agents-prev/agents-prev.html';
import managementTemplate from '../templates/management/management.html';
import overviewTemplate from '../templates/visualize/dashboards.html';
import settingsTemplate from '../templates/settings/settings.html';
import securityTemplate from '../templates/security/security.html';
import blankScreenTemplate from '../templates/error-handler/blank-screen.html';
import toolsTemplate from '../templates/tools/tools.html';
import { FortishieldConfig } from '../react-services/fortishield-config';
import { GenericRequest } from '../react-services/generic-request';
import { WzMisc } from '../factories/misc';
import { ApiCheck } from '../react-services/wz-api-check';
import { AppState } from '../react-services/app-state';
import { getAngularModule, getWzMainParams } from '../kibana-services';

const assignPreviousLocation = ($rootScope, $location) => {
  const path = $location.path();
  const params = $location.search();
  // Save current location if we aren't performing a health-check, to later be able to come back to the same tab
  if (!path.includes('/health-check')) {
    $rootScope.previousLocation = path;
    $rootScope.previousParams = params;
  }
};

function ip($q, $rootScope, $window, $location) {
  const wzMisc = new WzMisc();
  assignPreviousLocation($rootScope, $location);
  return getIp($q, $window, $location, wzMisc);
}

function nestedResolve($q, errorHandler, $rootScope, $location, $window) {
  const wzMisc = new WzMisc();
  const healthCheckStatus = $window.sessionStorage.getItem('healthCheck');
  if (!healthCheckStatus) return;
  const fortishieldConfig = new FortishieldConfig();
  assignPreviousLocation($rootScope, $location);
  const location = $location.path();
  return getWzConfig($q, GenericRequest, fortishieldConfig).then(() =>
    settingsWizard(
      $location,
      $q,
      $window,
      ApiCheck,
      AppState,
      GenericRequest,
      errorHandler,
      wzMisc,
      location && location.includes('/health-check'),
    ),
  );
}

function savedSearch($location, $window, $rootScope, $route) {
  const healthCheckStatus = $window.sessionStorage.getItem('healthCheck');
  if (!healthCheckStatus) return;
  assignPreviousLocation($rootScope, $location);
  return getSavedSearch($location, $window, $route);
}

function wzConfig($q, $rootScope, $location) {
  assignPreviousLocation($rootScope, $location);
  const fortishieldConfig = new FortishieldConfig();
  return getWzConfig($q, GenericRequest, fortishieldConfig);
}

function clearRuleId(commonData) {
  commonData.removeRuleId();
  return Promise.resolve();
}

function enableWzMenu($rootScope, $location) {
  const location = $location.path();
  $rootScope.hideWzMenu = location.includes('/health-check');
  if (!$rootScope.hideWzMenu) {
    AppState.setWzMenu();
  }
}

//Routes
const app = getAngularModule();

const redirectTo = () => getWzMainParams();
app.config($routeProvider => {
  $routeProvider
    .when('/health-check', {
      template: healthCheckTemplate,
      resolve: { wzConfig, ip },
      outerAngularWrapperRoute: true,
    })
    .when('/agents-preview/deploy', {
      template: agentDeployTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      reloadOnSearch: false,
      outerAngularWrapperRoute: true,
    })
    .when('/agents/:agent?/:tab?/:tabView?', {
      template: agentsTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      reloadOnSearch: false,
      outerAngularWrapperRoute: true,
    })
    .when('/agents-preview/', {
      template: agentsPrevTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      reloadOnSearch: false,
      outerAngularWrapperRoute: true,
    })
    .when('/manager/', {
      template: managementTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch, clearRuleId },
      reloadOnSearch: false,
      outerAngularWrapperRoute: true,
    })
    .when('/manager/:tab?', {
      template: managementTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch, clearRuleId },
      outerAngularWrapperRoute: true,
    })
    .when('/overview/', {
      template: overviewTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      reloadOnSearch: false,
      outerAngularWrapperRoute: true,
    })
    .when('/settings', {
      template: settingsTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      reloadOnSearch: false,
      outerAngularWrapperRoute: true,
    })
    .when('/security', {
      template: securityTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      outerAngularWrapperRoute: true,
    })
    .when('/fortishield-dev', {
      template: toolsTemplate,
      resolve: { enableWzMenu, nestedResolve, ip, savedSearch },
      outerAngularWrapperRoute: true,
    })
    .when('/blank-screen', {
      template: blankScreenTemplate,
      resolve: { enableWzMenu },
      outerAngularWrapperRoute: true,
    })
    .when('/', {
      redirectTo,
      outerAngularWrapperRoute: true,
    })
    .when('', {
      redirectTo,
      outerAngularWrapperRoute: true,
    })
    .otherwise({
      redirectTo: () => {
        return getWzMainParams();
      },
      outerAngularWrapperRoute: true,
    });
});

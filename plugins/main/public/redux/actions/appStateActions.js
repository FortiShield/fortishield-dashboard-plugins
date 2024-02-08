/*
 * Wazuh app - App State Actions
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

/**
 * Updates CurrentAPI in the appState store
 * @param currentAPI
 */
export const updateCurrentApi = currentAPI => {
  return {
    type: 'UPDATE_CURRENT_API',
    currentAPI: currentAPI,
  };
};

/**
 * Updates ShowMenu in the appState store
 * @param showMenu
 */
export const updateShowMenu = showMenu => {
  return {
    type: 'SHOW_MENU',
    showMenu: showMenu,
  };
};

/**
 * Updates WazuhNotReadyYet in the appState store
 * @param wazuhNotReadyYet
 */
export const updateWazuhNotReadyYet = wazuhNotReadyYet => {
  return {
    type: 'UPDATE_WAZUH_NOT_READY_YET',
    wazuhNotReadyYet: wazuhNotReadyYet,
  };
};

/**
 * Updates currentTab in the appState store
 * @param currentTab
 */
export const updateCurrentTab = currentTab => {
  return {
    type: 'UPDATE_WAZUH_CURRENT_TAB',
    currentTab: currentTab,
  };
};

/**
 * Updates currentPlatform in the appState store
 * @param currentPlatform
 */
export const updateCurrentPlatform = currentPlatform => {
  return {
    type: 'UPDATE_CURRENT_PLATFORM',
    currentPlatform,
  };
};

/**
 * Updates currentPlatform in the appState store
 * @param currentPlatform
 */
export const updateUserAccount = currentPlatform => {
  return {
    type: 'UPDATE_USER_ACCOUNT',
    userAccount,
  };
};

/**
 * Updates currentAgentData in the appState store
 * @param data
 */
export const updateCurrentAgentData = data => {
  return {
    type: 'UPDATE_SELECTED_AGENT_DATA',
    currentAgentData: data,
  };
};

/**
 * Updates showExploreAgentModalGlobal in the appState store
 * @param shouldShow
 */
export const showExploreAgentModalGlobal = shouldShow => {
  return {
    type: 'SHOW_EXPLORE_AGENT_MODAL_GLOBAL',
    showExploreAgentModalGlobal: shouldShow,
  };
};

/**
 * Updates userRoles in the appState store
 * @param userRoles
 */
export const updateUserRoles = userRoles => {
  return {
    type: 'UPDATE_USER_ROLES',
    userRoles,
  };
};

/**
 * Updates userPermissions in the appState store
 * @param userPermissions
 */
export const updateUserPermissions = userPermissions => {
  return {
    type: 'UPDATE_USER_PERMISSIONS',
    userPermissions,
  };
};

/**
 * Updates toastNotification in the appState store
 * @param toastNotification
 */
export const updateToastNotificationsModal = toastNotification => {
  return {
    type: 'UPDATE_TOAST_NOTIFICATIONS_MODAL',
    toastNotification,
  };
};

/**
 * Updates showFlyoutLogtest in the appState store
 * @param showFlyout
 */
export const showFlyoutLogtest = showFlyout => {
  return {
    type: 'SHOW_FLYOUT_LOGTEST',
    showFlyoutLogtest: showFlyout,
  };
};

/**
 * Updates dockedFlyoutLogtest in the appState store
 * @param dockedFlyout
 */
export const updateDockedLogtest = dockedFlyout => {
  return {
    type: 'UPDATE_DOCKED_LOGTEST',
    dockedFlyoutLogtest: dockedFlyout,
  };
};

/**
 * Updates the status of whether the user is logged in
 * @param withUserLogged
 */
export const updateWithUserLogged = withUserLogged => {
  return {
    type: 'UPDATE_WITH_USER_LOGGED',
    withUserLogged,
  };
};

/**
 * Updates allowedAgents in the appState store
 * @param allowedAgents
 */
export const updateAllowedAgents = allowedAgents => {
  return {
    type: 'GET_ALLOWED_AGENTS',
    allowedAgents,
  };
};

/**
 * Updates logtestToken in the appState store
 * @param logtestToken
 */
export const updateLogtestToken = logtestToken => {
  return {
    type: 'UPDATE_LOGTEST_TOKEN',
    logtestToken: logtestToken,
  };
};

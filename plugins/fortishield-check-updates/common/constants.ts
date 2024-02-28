export const PLUGIN_ID = 'fortishieldCheckUpdates';
export const PLUGIN_NAME = 'fortishield_check_updates';

export const SAVED_OBJECT_UPDATES = 'fortishield-check-updates-available-updates';
export const SAVED_OBJECT_USER_PREFERENCES = 'fortishield-check-updates-user-preferences';

export enum routes {
  checkUpdates = '/api/fortishield-check-updates/updates',
  userPreferences = '/api/fortishield-check-updates/user-preferences/me',
}

import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector } from '../../utils/driver';
import { FORTISHIELD_MENU_PAGE as pageName, SETTINGS_MENU_LINKS } from '../../utils/pages-constants';
const settingsButton = getSelector('settingsButton', pageName);
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const fortishieldMenuLeft = getSelector('fortishieldMenuLeft', pageName);
const fortishieldMenuRight = getSelector('fortishieldMenuRight', pageName);
const fortishieldMenuSettingRight = getSelector('fortishieldMenuSettingRight', pageName);

When('The user navigates to {} settings', (menuOption) => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  elementIsVisible(fortishieldMenuLeft);
  elementIsVisible(fortishieldMenuRight);
  elementIsVisible(settingsButton);
  clickElement(settingsButton);
  elementIsVisible(fortishieldMenuSettingRight);
  if (Cypress.env('type') == 'wzd') {
    cy.wait(1000);
    elementIsVisible(getSelector(menuOption, SETTINGS_MENU_LINKS)).click()
  } else {
    elementIsVisible(getSelector(menuOption, SETTINGS_MENU_LINKS));
    clickElement(getSelector(menuOption, SETTINGS_MENU_LINKS));
  };
});

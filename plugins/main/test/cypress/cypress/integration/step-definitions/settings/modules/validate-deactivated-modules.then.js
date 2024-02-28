import { clickElement, elementIsNotVisible, elementIsVisible, getSelector } from '../../../utils/driver';
import { FORTISHIELD_MENU_PAGE as pageName, MODULES_CARDS } from '../../../utils/pages-constants';
const modulesButton = getSelector('modulesButton', pageName);
const modulesDirectoryLink = getSelector('modulesDirectoryLink', pageName);
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const fortishieldMenuLeft = getSelector('fortishieldMenuLeft', pageName);
const fortishieldMenuRight = getSelector('fortishieldMenuRight', pageName);
const fortishieldMenuSettingRight = getSelector('fortishieldMenuSettingRight', pageName);

Then('The deactivated modules with {} are not displayed on home page', (moduleName) => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  elementIsVisible(fortishieldMenuLeft);
  elementIsVisible(fortishieldMenuRight);
  elementIsVisible(modulesButton);
  clickElement(modulesButton);
  cy.wait(1000)
  elementIsVisible(fortishieldMenuSettingRight);
  elementIsVisible(modulesDirectoryLink);
  clickElement(modulesDirectoryLink);
  cy.get('react-component[name="OverviewWelcome"]', { timeout: 15000 });
  elementIsNotVisible(getSelector(moduleName, MODULES_CARDS));
});

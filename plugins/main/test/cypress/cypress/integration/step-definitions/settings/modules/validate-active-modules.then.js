import { clickElement, elementIsVisible, getSelector } from '../../../utils/driver';
import { FORTISHIELD_MENU_PAGE as pageName, MODULES_CARDS } from '../../../utils/pages-constants';
const modulesButton = getSelector('modulesButton', pageName);
const modulesDirectoryLink = getSelector('modulesDirectoryLink', pageName);
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const fortishieldMenuLeft = getSelector('fortishieldMenuLeft', pageName);
const fortishieldMenuRight = getSelector('fortishieldMenuRight', pageName);
const fortishieldMenuSettingRight = getSelector('fortishieldMenuSettingRight', pageName);

Then('The activated modules with {} are displayed on home page', (moduleName) => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  elementIsVisible(fortishieldMenuLeft);
  elementIsVisible(fortishieldMenuRight);
  elementIsVisible(modulesButton);
  clickElement(modulesButton);
  elementIsVisible(fortishieldMenuSettingRight);
  elementIsVisible(modulesDirectoryLink);
  clickElement(modulesDirectoryLink);
  elementIsVisible(getSelector(moduleName, MODULES_CARDS));
});

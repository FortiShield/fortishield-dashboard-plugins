import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector} from '../../utils/driver';
import { FORTISHIELD_MENU_PAGE as pageName} from '../../utils/pages-constants';
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const modulesDirectoryLink = getSelector('modulesDirectoryLink', pageName);
const modulesButton = getSelector('modulesButton', pageName);

When('The user navigates overview page', () => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  elementIsVisible(modulesButton);
  clickElement(modulesButton);
  elementIsVisible(modulesDirectoryLink);
  clickElement(modulesDirectoryLink);
});

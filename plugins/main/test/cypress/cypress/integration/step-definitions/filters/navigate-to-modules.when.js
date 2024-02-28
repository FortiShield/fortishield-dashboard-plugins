import { When } from 'cypress-cucumber-preprocessor/steps';
import { xpathElementIsVisible, forceClickElementByXpath, getSelector, forceClickElement, elementIsVisible} from '../../utils/driver';

import { BASIC_MODULES} from '../../utils/pages-constants';
import { FORTISHIELD_MENU_PAGE as pageName} from '../../utils/pages-constants';
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
When('The user goes to {}', (moduleName) => {
  
  cy.wait(500);
  elementIsVisible(fortishieldMenuButton);
  cy.wait(500);
  forceClickElement(fortishieldMenuButton);
  xpathElementIsVisible(getSelector(moduleName, BASIC_MODULES));
  forceClickElementByXpath(getSelector(moduleName, BASIC_MODULES));
});

import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, validateURLIncludes, getSelector } from '../../../utils/driver';
import { FORTISHIELD_MENU_PAGE as pageName} from '../../../utils/pages-constants';
const managementButton = getSelector('managementButton', pageName);
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const rulesLink = getSelector('rulesLink', pageName);

When('The user navigates to rules', () => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(rulesLink);
  clickElement(rulesLink);
  validateURLIncludes('/manager/?tab=rules');
});

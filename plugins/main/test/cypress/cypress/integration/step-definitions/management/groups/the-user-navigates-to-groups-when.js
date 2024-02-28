import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector } from '../../../utils/driver';
import { FORTISHIELD_MENU_PAGE as pageName} from '../../../utils/pages-constants';
const groupsLink = getSelector('groupsLink', pageName);
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const managementButton = getSelector('managementButton', pageName);

When('The user navigates to groups page', () => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(groupsLink);
  clickElement(groupsLink);
});

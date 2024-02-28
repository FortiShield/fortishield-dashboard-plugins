import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector} from '../../utils/driver';

import { FORTISHIELD_MENU_PAGE as pageName} from '../../utils/pages-constants';
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const managementButton = getSelector('managementButton', pageName);
const reportingLink = getSelector('reportingLink', pageName);

When('The user navigates to management-reporting', () => {
  elementIsVisible(fortishieldMenuButton);
  clickElement(fortishieldMenuButton);
  cy.wait(500);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(reportingLink);
  clickElement(reportingLink);
  });

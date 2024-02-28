import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector} from '../../utils/driver';

import { FORTISHIELD_MENU_PAGE as pageName} from '../../utils/pages-constants';
const fortishieldMenuButton = getSelector('fortishieldMenuButton', pageName);
const agentsButton = getSelector('agentsButton', pageName);

When('The user navigates to the agent page', () => {
  clickElement(fortishieldMenuButton);
  elementIsVisible(agentsButton);
  clickElement(agentsButton);
});

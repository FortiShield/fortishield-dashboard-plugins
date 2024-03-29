/*
 * Fortishield app - Load all the Misc controllers.
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { BlankScreenController } from './blank-screen-controller';
import { getAngularModule } from '../../kibana-services';

const app = getAngularModule();

app
  .controller('blankScreenController', BlankScreenController);

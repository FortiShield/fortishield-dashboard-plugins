/*
 * Fortishield app - React Component component to display new updates notification.
 *
 * Copyright (C) 2015-2023 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React from 'react';
import { getFortishieldCheckUpdatesPlugin } from '../../kibana-services';

export const WzUpdatesNotification = () => {
  const { UpdatesNotification } = getFortishieldCheckUpdatesPlugin();

  return <UpdatesNotification />;
};

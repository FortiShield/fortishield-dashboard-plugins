/*
 * Fortishield app - Components compatibility operative system
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { FORTISHIELD_AGENTS_OS_TYPE, FORTISHIELD_MODULES_ID } from '../../common/constants';

export const UnsupportedComponents = {
  [FORTISHIELD_AGENTS_OS_TYPE.LINUX]: [],
  [FORTISHIELD_AGENTS_OS_TYPE.WINDOWS]: [FORTISHIELD_MODULES_ID.AUDITING, FORTISHIELD_MODULES_ID.DOCKER, FORTISHIELD_MODULES_ID.OPEN_SCAP],
  [FORTISHIELD_AGENTS_OS_TYPE.DARWIN]: [FORTISHIELD_MODULES_ID.AUDITING, FORTISHIELD_MODULES_ID.DOCKER, FORTISHIELD_MODULES_ID.OPEN_SCAP],
  [FORTISHIELD_AGENTS_OS_TYPE.SUNOS]: [FORTISHIELD_MODULES_ID.VULNERABILITIES],
  [FORTISHIELD_AGENTS_OS_TYPE.OTHERS]: [FORTISHIELD_MODULES_ID.AUDITING, FORTISHIELD_MODULES_ID.DOCKER, FORTISHIELD_MODULES_ID.OPEN_SCAP, FORTISHIELD_MODULES_ID.VULNERABILITIES]
};

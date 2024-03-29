import fs from 'fs';
import path from 'path';
import { FORTISHIELD_DATA_ABSOLUTE_PATH } from '../../common/constants';

export const createDirectoryIfNotExists = (directory: string): void => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

export const createLogFileIfNotExists = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.closeSync(fs.openSync(filePath, 'w'));
  }
};

export const createDataDirectoryIfNotExists = (directory?: string) => {
  const absoluteRoute = directory
    ? path.join(FORTISHIELD_DATA_ABSOLUTE_PATH, directory)
    : FORTISHIELD_DATA_ABSOLUTE_PATH;
  if (!fs.existsSync(absoluteRoute)) {
    fs.mkdirSync(absoluteRoute, { recursive: true });
  }
};

export const getDataDirectoryRelative = (directory: string) => {
  return path.join(FORTISHIELD_DATA_ABSOLUTE_PATH, directory);
};

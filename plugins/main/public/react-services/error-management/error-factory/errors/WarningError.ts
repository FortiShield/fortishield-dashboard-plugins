import { IFortishieldErrorInfo, IFortishieldErrorLogOpts } from '../../types';
import FortishieldError from './FortishieldError';

export class WarningError extends FortishieldError {
  logOptions: IFortishieldErrorLogOpts;
  constructor(error: Error, info?: IFortishieldErrorInfo) {
    super(error, info);
    Object.setPrototypeOf(this, WarningError.prototype);
    this.logOptions = {
      error: {
        message: `[${this.constructor.name}]: ${error.message}`,
        title: `An warning has occurred`,
        error: error,
      },
      level: 'WARNING',
      severity: 'BUSINESS',
      display: true,
      store: false,
    };
  }
}

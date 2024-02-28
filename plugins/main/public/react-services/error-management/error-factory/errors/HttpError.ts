import { IFortishieldErrorInfo, IFortishieldErrorLogOpts } from '../../types';
import FortishieldError from './FortishieldError';

export class HttpError extends FortishieldError {
  logOptions: IFortishieldErrorLogOpts;
  constructor(error: Error, info?: IFortishieldErrorInfo) {
    super(error, info);
    this.logOptions = {
      error: {
        message: `[${this.constructor.name}]: ${error.message}`,
        title: `An error has occurred`,
        error: error,
      },
      level: 'ERROR',
      severity: 'BUSINESS',
      display: true,
      store: false,
    };
  }
}
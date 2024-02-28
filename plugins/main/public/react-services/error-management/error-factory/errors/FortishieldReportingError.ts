import { IFortishieldErrorInfo, IFortishieldErrorLogOpts } from '../../types';
import { HttpError } from './HttpError';

export class FortishieldReportingError extends HttpError {
  constructor(error: Error, info?: IFortishieldErrorInfo) {
    super(error, info);
  }
}

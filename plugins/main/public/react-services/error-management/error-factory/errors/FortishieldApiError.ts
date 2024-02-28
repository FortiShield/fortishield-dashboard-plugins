import { IFortishieldErrorInfo, IFortishieldErrorLogOpts } from '../../types';
import { HttpError } from './HttpError';

export class FortishieldApiError extends HttpError {
  constructor(error: Error, info?: IFortishieldErrorInfo) {
    super(error, info);
  }
}

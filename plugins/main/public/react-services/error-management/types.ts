import { UIErrorLog } from '../error-orchestrator/types';

export interface IFortishieldErrorLogOpts extends Omit<UIErrorLog,'context'> {}
export interface IErrorOpts {
  error: Error;
  message: string;
  code?: number;
}

export interface IFortishieldError extends Error, IErrorOpts {
  error: Error;
  message: string;
  code?: number;
  logOptions: IFortishieldErrorLogOpts;
}

export interface IFortishieldErrorConstructor {
  new (error: Error, info: IFortishieldErrorInfo): IFortishieldError;
}

export interface IFortishieldErrorInfo {
  message: string;
  code?: number;
}

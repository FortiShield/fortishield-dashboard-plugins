import { IFortishieldError, IFortishieldErrorInfo, IFortishieldErrorLogOpts } from "../../types";


export default abstract class FortishieldError extends Error {
    abstract logOptions: IFortishieldErrorLogOpts;
    constructor(public error: Error, info?: IFortishieldErrorInfo) {
        super(info?.message || error.message);
        const childrenName = this.constructor.name; // keep the children class name
        Object.setPrototypeOf(this, FortishieldError.prototype); // Because we are extending built in class
        this.name = childrenName;
        this.stack = this.error.stack; // keep the stack trace from children
    }
}
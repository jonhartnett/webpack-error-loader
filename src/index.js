import {getOptions} from 'loader-utils';

export default function WebpackErrorLoader(source, ...args){
    let { message=null, type='error' } = getOptions(this);
    if(message instanceof Function)
        message = this::message(...arguments);
    if(message != null){
        let err = new Error(message);
        switch(type){
            case 'error':
                throw err;
            case 'warning':
                this.emitWarning(err);
                break;
            case 'weak-error':
                this.emitError(err);
                break;
            default:
                throw new Error(`webpack-error-loader: Invalid type: ${type}`);
        }
    }
    return source;
}
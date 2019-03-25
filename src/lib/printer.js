import * as R from 'ramda';
import { EventEmitter } from 'events';

const printTabbed = R.unapply(R.join('\t'));

export const defaultPrinter = (topic, payload) =>
    console.log(printTabbed('message', topic, '\n', payload));

export class Printable extends EventEmitter {
    print(printer = defaultPrinter) {
        this.on('message', printer);
        return this;
    }
}

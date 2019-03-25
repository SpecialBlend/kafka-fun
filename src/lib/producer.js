import * as R from 'ramda';
import { Producer } from 'kafka-node';
import { superclass } from '@specialblend/superclass';
import { __call__, Callable } from '@specialblend/callable';
import { EventEmitter } from 'events';
import { Printable } from './printer';
import { promisify } from './common';

const __send__ = Symbol('__send__');

class PromiseProducer extends Producer {}

PromiseProducer.prototype[__send__] = promisify(PromiseProducer.prototype.send);

/**
 * Callable kafka Producer with print method
 */
export class PipeProducer extends superclass(Callable, PromiseProducer, Printable, EventEmitter) {

    /**
     * Extend Producer
     * @param args
     */
    constructor(...args) {
        super(...args);
    }

    send(...args) {
        return this[__send__](...args);
    }

    /**
     * Make instance callable and forward to this.send
     * @param args
     * @returns {Promise<*>}
     */
    [__call__](...args) {
        return this.send(...args);
    }
}

/**
 * Create curried PipeProducer
 */
export const createProducer = R.curry(
    (client, producerOptions = {}) =>
        new PipeProducer(client, producerOptions),
);

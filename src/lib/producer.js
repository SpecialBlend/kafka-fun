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
 * Callable kafka Producer
 * when instance is called directly, acts like PipeProducer.send
 */
export class PipeProducer extends superclass(Callable, PromiseProducer, Printable, EventEmitter) {

    /**
     * Create
     * @param {Client} client kafka client
     * @param {Object?} options opyions
     */
    constructor(client, options) {
        super(client, options);
    }

    /**
     * Send a payload
     * @param {Array<String>} payload payload
     * @returns {Promise<*>} result
     */
    send(payload) {
        return this[__send__](payload);
    }

    /**
     * Make instance callable alias of `this.send`
     * @param {Array<String>} payload payload
     * @returns {Promise<*>} result
     */
    [__call__](payload) {
        return this.send(payload);
    }
}

/**
 * Curried factory of PipeProducer
 * @return {PipeProducer}
 */
export const createProducer = R.curry(
    (client, producerOptions = {}) =>
        new PipeProducer(client, producerOptions),
);

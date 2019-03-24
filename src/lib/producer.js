import * as R from 'ramda';
import { Producer } from 'kafka-node';
import { superclass } from '@specialblend/superclass';
import { __call__, Callable } from '@specialblend/callable';
import { EventEmitter } from 'events';
import { Printable } from './printer';
import { promisify } from 'util';

const __producerSend__ = Symbol('__producerSend__');

/**
 * Callable kafka Producer with print method
 */
export class PipeProducer extends superclass(Callable, Producer, Printable, EventEmitter) {

    /**
     * Extend Producer
     * @param args
     */
    constructor(...args) {
        super(...args);
        this[__producerSend__] = promisify(this.producer.send.bind(this));
    }

    /**
     * Send payload
     * @param messages
     * @returns {Promise<*>}
     */
    async send(messages) {
        return this[__producerSend__](messages);
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

import { Consumer as KafkaConsumer } from 'kafka-node';
import { EventEmitter } from 'events';
import { mixin, superclass } from '@specialblend/superclass';
import { Callable, __call__ } from '@specialblend/callable';
import { Printable } from './printer';
import * as R from 'ramda';

class Consumer extends mixin(KafkaConsumer,
    (client, topic, topicOptions = {}, consumerOptions = {}) =>
        [client, [{
            ...topicOptions,
            topic,
        }], consumerOptions],
) {
}

/**
 * Callable kafka Consumer with pipe and error helper methods
 */
export class PipeConsumer extends superclass(Callable, Consumer, Printable, EventEmitter) {

    /**
     * Pipe incoming messages to provided handler
     * @param {Function} handler message handler function
     * @returns {PipeConsumer} self
     */
    pipe(handler) {
        this.on('message', handler);
        return this;
    }

    /**
     * Alias for this.on('error')
     * @param {Function} handler error handler function
     * @return {PipeConsumer} self
     */
    error(handler) {
        this.on('error', handler);
        return this;
    }

    /**
     * Make instance callable alias of `this.pipe`
     * @param {Function} handler message handler function
     * @returns {PipeConsumer} self
     */
    [__call__](handler) {
        return this.pipe(handler);
    }
}

/**
 * Curried factory of PipeConsumer
 * @return {PipeConsumer}
 */
export const createConsumer = R.curry(
    (client, topic, topicOptions = {}, consumerOptions = {}) =>
        new PipeConsumer(client, topic, topicOptions, consumerOptions),
);

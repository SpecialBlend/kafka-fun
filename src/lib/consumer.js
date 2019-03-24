import { mixin, superclass } from '@specialblend/superclass';
import { Consumer as KafkaConsumer } from 'kafka-node';
import { __call__, Callable } from '@specialblend/callable';
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
 * Callable kafka Consumer with pipe and print methods
 */
export class PipeConsumer extends superclass(Callable, Consumer, Printable) {

    /**
     * Pipe incoming messages to handler
     * @param handler
     * @returns {PipeConsumer}
     */
    pipe(handler) {
        this.on('message', handler);
        return this;
    }

    /**
     * Alias for on('error')
     * @param handler
     */
    error(handler) {
        this.on('error', handler);
    }

    /**
     * Make instance callable and forward to this.pipe
     * @param args
     * @returns {PipeConsumer}
     */
    [__call__](...args) {
        return this.pipe(...args);
    }
}

/**
 * Create curried PipeConsumer
 */
export const createConsumer = R.curry(
    (client, topic, topicOptions = {}, consumerOptions = {}) =>
        new PipeConsumer(client, topic, topicOptions, consumerOptions),
);

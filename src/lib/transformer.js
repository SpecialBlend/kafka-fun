import * as R from 'ramda';
import { mixin, superclass } from '@specialblend/superclass';
import { Callable } from '@specialblend/callable';
import { EventEmitter } from 'events';
import { Printable } from './printer';
import { PipeProducer } from './producer';
import { PipeConsumer } from './consumer';

/**
 * Map transformer constructor to PipeConsumer constructor
 * @type {Class}
 */
const Consumer = mixin(
    PipeConsumer,
    (transformer, client, sourceTopic) => [client, sourceTopic],
);

/**
 * Map transformer constructor to PipeSender constructor
 * @type {Class}
 */
const Producer = mixin(
    PipeProducer,
    (transformer, client, sourceTopic, destinationTopic) => [client, destinationTopic],
);

/**
 * A consumer/sender mixin that transforms payloads
 * from sourceTopic and pipes to destinationTopic
 * and sends failed payloads to deadLetterTopic if provided
 * or back into sourceTopic if not provided
 */
export class PipeTransformer extends superclass(Callable, Consumer, Producer, Printable, EventEmitter) {
    // constructor(transformer, client, sourceTopic, destinationTopic, deadLetterTopic = sourceTopic) {
    //     super();
    //     this.on('ready', () => {
    //         // this.pipe(async(...args) => {
    //         //     const payload = await transformer(...args);
    //         //     try {
    //         //         return await this.send({
    //         //             topic: destinationTopic,
    //         //             messages: payload,
    //         //         });
    //         //     } catch (err) {
    //         //         this.emit('error', err);
    //         //         return await this.send({
    //         //             topic: deadLetterTopic,
    //         //             messages: payload,
    //         //         });
    //         //     }
    //         // });
    //     });
    // }
}

/**
 * Create curried PipeTransformer
 */
export const createTransformer = R.curry(
    (transformer, client, sourceTopic, destinationTopic, deadLetterTopic = sourceTopic) =>
        new PipeTransformer(transformer, client, sourceTopic, destinationTopic, deadLetterTopic),
);

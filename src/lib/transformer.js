import * as R from 'ramda';
import superclass from '@specialblend/superclass';
import { EventEmitter } from 'events';
import { Printable } from './printer';
import { PipeProducer } from './producer';
import { PipeConsumer } from './consumer';

/**
 * A consumer/sender mixin that transforms payloads
 * from sourceTopic and pipes to destinationTopic
 * and sends failed payloads to deadLetterTopic if provided
 * or back into sourceTopic if not provided
 */
export class PipeTransformer extends superclass(EventEmitter, Printable) {
    constructor(transformer, client, sourceTopic, destinationTopic, deadLetterTopic = sourceTopic) {
        super();
        this.consumer = new PipeConsumer(client, sourceTopic);
        this.producer = new PipeProducer(client);
        this.producer.on('ready', () => this.initialize(transformer, destinationTopic, deadLetterTopic));
    }
    initialize(transformer, destinationTopic, deadLetterTopic) {
        this.consumer.pipe(async(...args) => {
            try {
                const payload = await transformer(...args);
                return await this.producer.send({
                    topic: destinationTopic,
                    messages: payload,
                });
            } catch (err) {
                this.emit('error', err);
                return await this.producer.send({
                    topic: deadLetterTopic,
                    messages: args,
                });
            }
        });
    }
}

/**
 * Create curried PipeTransformer
 */
export const createTransformer = R.curry(
    (transformer, client, sourceTopic, destinationTopic, deadLetterTopic = sourceTopic) =>
        new PipeTransformer(transformer, client, sourceTopic, destinationTopic, deadLetterTopic),
);

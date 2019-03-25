import * as R from 'ramda';
import superclass from '@specialblend/superclass';
import { EventEmitter } from 'events';
import { Printable } from './printer';
import { PipeProducer } from './producer';
import { PipeConsumer } from './consumer';

/**
 * Consumer/producer mixin that
 * pipes messages from `sourceTopic`
 * into `transformer` function,
 * and sends result to `destinationTopic`,
 * or `deadLetterTopic` on error
 */
export class PipeTransformer extends superclass(EventEmitter, Printable) {

    /**
     * create a PipeTransformer
     * @param {Function} transformer the transformer function
     * @param {Client} client kafka Client
     * @param {String }sourceTopic name of topic to read from
     * @param {String} destinationTopic name of topic to send to
     * @param {String} deadLetterTopic name of topic to send failed payloads
     */
    constructor(transformer, client, sourceTopic, destinationTopic, deadLetterTopic) {
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
 * Curried factory of PipeTransformer
 * @return {PipeTransformer}
 */
export const createTransformer = R.curry(
    (transformer, client, sourceTopic, destinationTopic, deadLetterTopic) =>
        new PipeTransformer(transformer, client, sourceTopic, destinationTopic, deadLetterTopic),
);

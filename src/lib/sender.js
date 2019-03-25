import { PipeProducer } from './producer';
import * as R from 'ramda';

/**
 * A callable kafka Producer with preset topic
 */
export class PipeSender extends PipeProducer {

    /**
     * Curry topic and payload options
     * @param client
     * @param topic
     * @param payloadOptions
     * @param producerOptions
     */
    constructor(client, topic, payloadOptions = {}, producerOptions = {}) {
        super(client, producerOptions);
        this.topic = topic;
        this.payloadOptions = payloadOptions;
    }

    /**
     * Send payload to preset topic with preset options
     * @param messages
     * @returns {Promise<*>}
     */
    send(messages) {
        const { topic, payloadOptions } = this;
        return super.send({
            ...payloadOptions,
            topic,
            messages,
        });
    }
}

/**
 * Create curried PipeProducer
 */
export const createSender = R.curry(
    (client, topic, payloadOptions = {}, producerOptions = {}) =>
        new Promise((resolve, reject) => {
            const sender = new PipeSender(client, topic, payloadOptions, producerOptions);
            sender.on('ready', () => resolve(sender));
            sender.on('error', reject);
        })
);

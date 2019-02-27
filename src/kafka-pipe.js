/* eslint-disable max-params */

import { Consumer, Producer } from 'kafka-node';
import { promisify } from 'util';

/**
 * Extend Kafka Consumer class to add pipe method
 */
export class PipeConsumer extends Consumer {
    pipe(resolver) {
        this.on('message', resolver);
        return this;
    }
}

/**
 * Create Piped Consumer
 * @param {KafkaClient} client: The kafka client
 * @param {String} topic: Name of the topic to read
 * @param {Object|null} settings: Optional topic settings
 * @param {Object|null} options: Optional consumer settings
 * @return {PipeConsumer}: The resulting PipeConsumer
 */
export const createConsumer = (client, topic, settings = {}, options = {}) =>
    new PipeConsumer(client, [{ ...settings, topic }], options);

/**
 * Create Piped Producer
 * @param {KafkaClient} client: The kafka client
 * @param {String} topic: Name of the topic to write
 * @param {Object|null} settings: Optional Consumer settings
 * @return {Function}: The resulting function
 */
export const createProducer = (client, topic, settings = {}) => {
    const producer = new Producer(client);
    const producerSend = promisify(producer.send.bind(producer));
    return messages => producerSend({
        ...settings,
        topic,
        messages,
    });
};

/* eslint-disable max-params */

import { Consumer, Producer } from 'kafka-node';
import { promisify } from 'util';

/**
 * Extend Kafka Consumer class to add pipe method
 */
export class PipeConsumer extends Consumer {
    pipe(resolve) {
        this.on('message', resolve);
        return this;
    }
}

/**
 * Create Piped Consumer
 * @param {KafkaClient} client: kafka client
 * @param {String} topic: name of topic
 * @param {Object|null} topicSettings: optional topic settings
 * @param {Object|null} options: optional consumer settings
 * @return {PipeConsumer}: PipeConsumer
 */
export const createConsumer = (client, topic, topicSettings = {}, options = {}) =>
    new PipeConsumer(client, [{ ...topicSettings, topic }], options);

/**
 * Create Piped Producer
 * @param {KafkaClient} client: kafka client
 * @param {String} topic: name of topic
 * @param {Object|null} sendSettings: optional send settings
 * @param {Object|null} options: optional producer settings
 * @return {Function}: The resulting curried send function
 */
export const createProducer = (client, topic, sendSettings = {}, options = {}) => {
    const producer = new Producer(client, options);
    const producerSend = promisify(producer.send.bind(producer));
    return messages => producerSend([{
        ...sendSettings,
        topic,
        messages,
    }]);
};

/**
 * Create Transformer that reads from sourceTopic, transforms data then pipes to destinationTopic
 * @param {KafkaClient} client: kafka client
 * @param {String} sourceTopic: source kafka topic name
 * @param {String} destinationTopic: destination kafka topic name
 * @param {Function} transform: transformer function
 * @return {PipeConsumer}: PipeConsumer
 */
export const createTransformer = (client, sourceTopic, destinationTopic, transform) => {
    const sendToDestination = createProducer(client, destinationTopic);
    const consumer = createConsumer(client, sourceTopic);
    consumer.pipe(message => sendToDestination([transform(message)]));
    return consumer;
};

/* eslint-disable max-params */
import * as R from 'ramda';
import { Consumer, Producer } from 'kafka-node';
import { promisify } from 'util';

export { KafkaClient as Client } from 'kafka-node';

/**
 * Extend kafka-node Consumer class to add pipe method
 */
export class PipeConsumer extends Consumer {
    pipe(resolve) {
        this.on('message', resolve);
        return this;
    }
}

/**
 * Extend kafka-node Producer class to promisify send method
 */
export class PipeProducer extends Producer {
    async send(payloads) {
        const producerSend = promisify(super.send.bind(this));
        return producerSend(payloads);
    }
}

/**
 * Create Piped Consumer
 * @param {Client} client: kafka client
 * @param {String} topic: name of topic
 * @param {Object|none} topicSettings: optional topic settings
 * @param {Object|none} options: optional consumer settings
 * @return {PipeConsumer}: PipeConsumer
 */
export const createConsumer = R.curry(
    (client, topic, topicSettings = {}, options = {}) =>
        new PipeConsumer(client, [{ ...topicSettings, topic }], options)
);

/**
 * Create curried Producer.send function
 * @param {Client} client: kafka client
 * @param {String} topic: name of topic
 * @param {Object|null} sendSettings: optional send settings
 * @param {Object|null} options: optional producer settings
 * @return {Function}: The resulting curried send function
 */
export const createSender = R.curry(
    (client, topic, sendSettings = {}, options = {}) => {
        const producer = new PipeProducer(client, options);
        return messages => producer.send([{
            ...sendSettings,
            topic,
            messages,
        }]);
    }
);

/**
 * Create Transformer that reads from sourceTopic, transforms data then pipes to destinationTopic
 * @param {Client} client: kafka client
 * @param {String} sourceTopic: source kafka topic name
 * @param {String} destinationTopic: destination kafka topic name
 * @param {Function} transform: transformer function
 * @return {PipeConsumer}: PipeConsumer
 */
export const createTransformer = R.curry(
    (client, sourceTopic, destinationTopic, transform) => {
        const sendToDestination = createSender(client, destinationTopic);
        const consumer = createConsumer(client, sourceTopic);
        consumer.pipe(message => sendToDestination([transform(message)]));
        return consumer;
    }
);

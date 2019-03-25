import { KafkaClient } from 'kafka-node';

/**
 * Kafka Client
 */
export class Client extends KafkaClient {

    /**
     * Create a kafka Client
     * @param {String} kafkaHost kafka host
     * @param {Object?} options options
     */
    constructor(kafkaHost, options) {
        super({ kafkaHost, ...options });
    }
}

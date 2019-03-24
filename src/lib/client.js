import { mixin } from '@specialblend/superclass';
import { KafkaClient } from 'kafka-node';

export class Client extends mixin(KafkaClient, (kafkaHost, options) => ({ kafkaHost, ...options })) {

}

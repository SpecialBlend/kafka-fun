import { EventEmitter } from 'events';

export const __kafkaClientConstruct = jest.fn();
export const __kafkaConsumerConstruct = jest.fn();
export const __kafkaConsumerRegisterEventListener = jest.fn();

export const __kafkaProducerConstruct = jest.fn();
export const __kafkaProducerRegisterEventListener = jest.fn();
export const __kafkaProducerSend = jest.fn();
export const __kafkaProducerOnError = jest.fn();
export const __kafkaProducerQueryMockStatus = jest.fn(() => null);

export class KafkaClient {
    constructor(...params) {
        __kafkaClientConstruct(...params);
    }
}

export class Consumer extends EventEmitter {
    constructor(...params) {
        super(...params);
        __kafkaConsumerConstruct(...params);
    }
    on(...params) {
        super.on(...params);
        __kafkaConsumerRegisterEventListener(...params);
    }
}

export class Producer extends EventEmitter {
    __setupMockStatus() {
        this.on('error', __kafkaProducerOnError);
        const err = __kafkaProducerQueryMockStatus();
        if (err !== null) {
            this.emit('error', err);
            return;
        }
        this.emit('ready');
    }
    constructor(...params) {
        super(...params);
        __kafkaProducerConstruct(...params);
        this.__setupMockStatus();
    }
    on(...params) {
        super.on(...params);
        __kafkaProducerRegisterEventListener(...params);
    }
    async send(params, callback) {
        try {
            const response = await __kafkaProducerSend(params);
            return callback(null, response);
        } catch (err) {
            return callback(err);
        }
    }
}

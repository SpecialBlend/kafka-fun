import * as R from 'ramda';
import { EventEmitter } from 'events';

export const __kafkaProducerQueryMockStatus__ = jest.fn(R.always(null));
export const __kafkaProducerSend__ = jest.fn(R.always(null));

async function setupMockStatus() {
    try {
        await __kafkaProducerQueryMockStatus__();
        this.emit('ready');
    } catch (err) {
        this.emit('error', err);
    }
}

export const KafkaClient = jest.fn(class extends EventEmitter {});

export const Consumer = jest.fn(class extends EventEmitter {});

export const Producer = jest.fn(class extends EventEmitter {
    constructor(...params) {
        super(...params);
        setTimeout(setupMockStatus.bind(this), 10);
    }
    async send(params, callback) {
        try {
            const response = await __kafkaProducerSend__(params);
            return callback(null, response);
        } catch (err) {
            return callback(err);
        }
    }
});

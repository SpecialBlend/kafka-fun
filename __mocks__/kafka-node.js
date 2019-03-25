import { GenericMockType } from './support';

export const __kafkaProducerQueryMockStatus__ = jest.fn(() => Promise.resolve(null));
export const __producerSend__ = jest.fn();

export class KafkaClient extends GenericMockType() {}

export class Consumer extends GenericMockType() {}

export const Producer = class extends GenericMockType() {
    constructor(...props) {
        super(...props);
    }
    on(...args) {
        super.on(...args);
        setTimeout(async() => {
            try {
                await __kafkaProducerQueryMockStatus__();
                this.emit('ready');
            } catch (err) {
                this.emit('error', err);
            }
        }, 100);
    }
};

Producer.prototype.send = __producerSend__;

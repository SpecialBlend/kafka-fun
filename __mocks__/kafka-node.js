import * as R from 'ramda';
import { GenericMockType } from './support';

export const __kafkaProducerQueryMockStatus__ = jest.fn(R.always(null));

async function setupMockStatus() {
    try {
        await __kafkaProducerQueryMockStatus__();
        this.emit('ready');
    } catch (err) {
        this.emit('error', err);
    }
}

export class KafkaClient extends GenericMockType {}

export class Consumer extends GenericMockType {}

export const Producer = class extends GenericMockType {
    constructor(...props) {
        super(...props);
        setTimeout(setupMockStatus.bind(this), 1);
    }
    async send() {
    }
};

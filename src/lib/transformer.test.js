import * as R from 'ramda';
import { PipeConsumer } from './consumer';
import { PipeProducer } from './producer';
import { PipeTransformer } from './transformer';

describe('PipeTransformer', () => {
    let transformer;
    const client = Symbol('client');
    const sourceTopic = Symbol('sourceTopic');
    const destinationTopic = Symbol('destinationTopic');
    const deadLetterTopic = Symbol('deadLetterTopic');
    const transform = jest.fn(R.reverse);
    beforeAll(() => {
        transformer = new PipeTransformer(transform, client, sourceTopic, destinationTopic, deadLetterTopic);
    });
    test('has expected PipeProducer methods', () => {
        expect(PipeTransformer.prototype).toHaveProperty('pipe', expect.any(Function));
    });
    test('is a function', () => {
        expect(PipeTransformer).toBeFunction();
    });
    describe('instance', () => {

    });
});

import * as R from 'ramda';
import { PipeTransformer, createTransformer } from './transformer';
import { PipeConsumer } from './consumer';
import { PipeProducer } from './producer';
import { Printable } from './printer';

describe('PipeTransformer', () => {
    let consumerPipe;
    let producerSend;
    let transformer;
    const client = Symbol('client');
    const sourceTopic = Symbol('sourceTopic');
    const destinationTopic = Symbol('destinationTopic');
    const deadLetterTopic = Symbol('deadLetterTopic');
    const transform = R.compose(JSON.parse, R.prop('value'));
    const reportError = jest.fn();
    beforeAll(() => {
        transformer = new PipeTransformer(transform, client, sourceTopic, destinationTopic, deadLetterTopic);
        consumerPipe = jest.spyOn(transformer.consumer, 'pipe');
        producerSend = jest.spyOn(transformer.producer, 'send');
    });
    test('has expected props', () => {
        expect(transformer).toHaveProperty('consumer', expect.any(PipeConsumer));
        expect(transformer).toHaveProperty('producer', expect.any(PipeProducer));
    });
    describe('intializes when producer ready', () => {
        beforeAll(() => {
            transformer.producer.emit('ready');
        });
        test('calls consumer.pipe with expected data', () => {
            expect(consumerPipe).toHaveBeenCalledWith(expect.any(Function));
        });
    });
    describe('on message events', () => {
        const message = JSON.stringify({ data: 'test message wEZsxrdytfcyvguhbijnoklm' });
        const payload = {
            topic: sourceTopic,
            value: message,
        };
        const badPayload = {
            topic: sourceTopic,
            value: 'not-valid/json',
        };
        beforeAll(() => {
            transformer.on('error', reportError);
            transformer.consumer.emit('message', payload);
            transformer.consumer.emit('message', badPayload);
        });
        test('sends transformed payloads to destinationTopic', () => {
            expect(producerSend).toHaveBeenCalledWith({
                topic: destinationTopic,
                messages: JSON.parse(message),
            });
        });
        test('sends failed payloads to destinationTopic', () => {
            expect(reportError).toHaveBeenCalledWith(expect.any(Error));
            expect(producerSend).toHaveBeenCalledWith({
                topic: deadLetterTopic,
                messages: [badPayload],
            });
        });
    });
    test('is Printable', () => {
        expect(PipeTransformer.prototype).toHaveProperty('print', Printable.prototype.print);
    });
});

describe('createTransformer', () => {
    test('is a function', () => {
        expect(createTransformer).toBeFunction();
    });
    test('returns instance of PipeTransformer', () => {
        const client = Symbol('client');
        const sourceTopic = Symbol('sourceTopic');
        const destinationTopic = Symbol('destinationTopic');
        const deadLetterTopic = Symbol('deadLetterTopic');
        const transform = R.compose(JSON.parse, R.prop('value'));
        const transformer = createTransformer(transform, client, sourceTopic, destinationTopic, deadLetterTopic);
        expect(transformer).toBeInstanceOf(PipeTransformer);
    });
});

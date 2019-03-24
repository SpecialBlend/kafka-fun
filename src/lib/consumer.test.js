import { Callable } from '@specialblend/callable';
import { PipeConsumer, createConsumer } from './consumer';
import { Printable } from './printer';
import { Consumer } from 'kafka-node';
import { __construct__ } from '../../__mocks__/support';

describe('PipeConsumer', () => {
    let consumer;
    let consumerEventSpy;
    const client = Symbol('client');
    const topic = Symbol('topic');
    const topicOptions = Symbol('topicOptions');
    const consumerOptions = Symbol('consumerOptions');
    beforeAll(() => {
        consumer = new PipeConsumer(client, topic, topicOptions, consumerOptions);
    });
    test('is a function', () => {
        expect(PipeConsumer).toBeFunction();
    });
    test('calls underlying Consumer with expected props', () => {
        expect(Consumer.prototype[__construct__]).toHaveBeenCalledWith(client, [{ ...topicOptions, topic }], consumerOptions);
    });
    describe('instance', () => {
        test('is also a function', () => {
            expect(consumer).toBeFunction();
        });
        test('is instance of Callable', () => {
            expect(consumer).toBeInstanceOf(Callable);
        });
        describe('pipe method', () => {
            const handler = jest.fn();
            let afterPipe;
            beforeAll(() => {
                consumerEventSpy = jest.spyOn(consumer, 'on');
                afterPipe = consumer.pipe(handler);
            });
            test('registers message event to handler', () => {
                expect(consumerEventSpy).toHaveBeenCalledWith('message', handler);
            });
            test('is fluent', () => {
                expect(afterPipe).toBe(consumer);
            });
        });
    });
    test('is Printable', () => {
        expect(PipeConsumer.prototype).toHaveProperty('print', Printable.prototype.print);
    });
});

describe('createConsumer', () => {
    let createConsumerResult;
    const client = Symbol('client');
    const topic = Symbol('topic');
    const topicOptions = Symbol('topicOptions');
    const consumerOptions = Symbol('consumerOptions');
    beforeAll(() => {
        createConsumerResult = createConsumer(client, topic, topicOptions, consumerOptions);
    });
    test('is a function', () => {
        expect(createConsumer).toBeFunction();
    });
    test('instance of PipeConsumer', () => {
        expect(createConsumerResult).toBeInstanceOf(PipeConsumer);
    });
    test('expected results', () => {
        expect(Consumer.prototype[__construct__]).toHaveBeenCalledWith(client, [{ ...topicOptions, topic }], consumerOptions);
    });
});

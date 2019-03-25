import { Callable } from '@specialblend/callable';
import { PipeProducer, createProducer } from './producer';
import { Printable } from './printer';
import { Producer } from 'kafka-node';
import { __construct__ } from '../../__mocks__/support';
import { __producerSend__ } from '../../__mocks__/kafka-node';

describe('PipeProducer', () => {
    let producer;
    const client = Symbol('client');
    const producerOptions = Symbol('producerOptions');
    beforeAll(() => {
        producer = new PipeProducer(client, producerOptions);
    });
    test('is a function', () => {
        expect(PipeProducer).toBeFunction();
    });
    test('calls underlying Consumer with expected props', () => {
        expect(Producer.prototype[__construct__]).toHaveBeenCalledWith(client, producerOptions);
    });
    describe('prototype', () => {
        test('has send method', () => {
            expect(PipeProducer.prototype).toHaveProperty('send', expect.any(Function));
        });
    });
    describe('instance', () => {
        test('is also a function', () => {
            expect(producer).toBeFunction();
        });
        test('is instance of Callable', () => {
            expect(producer).toBeInstanceOf(Callable);
        });
        describe('send method', () => {
            test('calls underlying Producer.send with expected data', () => {
                const messages = Symbol('messages');
                producer.send(messages);
                expect(__producerSend__).toHaveBeenCalledWith(messages, expect.any(Function));
            });

        });
    });
    describe('is Callable', () => {
        test('is instance of Callable', () => {
            expect(producer).toBeInstanceOf(Callable);
        });
        test('when called, functions as send method', () => {
            const messages = Symbol('messages');
            producer(messages);
            expect(__producerSend__).toHaveBeenCalledWith(messages, expect.any(Function));
        });
    });
    test('is Printable', () => {
        expect(PipeProducer.prototype).toHaveProperty('print', Printable.prototype.print);
    });
});

describe('createProducer', () => {
    let result;
    const client = Symbol('client');
    const producerOptions = Symbol('producerOptions');
    beforeAll(() => {
        result = createProducer(client, producerOptions);
    });
    test('is a function', () => {
        expect(createProducer).toBeFunction();
    });
    test('returns instance of PipeConsumer', () => {
        expect(result).toBeInstanceOf(PipeProducer);
    });
    test('works as expected', () => {
        expect(Producer.prototype[__construct__]).toHaveBeenCalledWith(client, producerOptions);
    });
});

import { Callable } from '@specialblend/callable';
import { PipeProducer, createProducer } from './producer';
import { Printable } from './printer';
import { Consumer, Producer } from 'kafka-node';
import { __construct__ } from '../../__mocks__/support';
import { promisify } from './common';

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
        expect(Consumer.prototype[__construct__]).toHaveBeenCalledWith(client, producerOptions);
    });
    describe('instance', () => {
        test('is also a function', () => {
            expect(producer).toBeFunction();
        });
        test('is instance of Callable', () => {
            expect(producer).toBeInstanceOf(Callable);
        });
        describe('send method', () => {
            test('is promisifed Producer.send', () => {
                expect(producer.send).not.toBe(Producer.prototype.send);
                expect(producer.send).toBe(promisify(Producer.prototype.send));
            });
        });
    });
    describe('is Callable', () => {
        test('is instance of Callable', () => {
            expect(producer).toBeInstanceOf(Callable);
        });
        test('when called, functions as send method', () => {
            const message = Symbol('message');
            const send = jest.spyOn(producer, 'send');
            producer(message);
            expect(send).toHaveBeenCalledWith(message);
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
    test('instance of PipeConsumer', () => {
        expect(result).toBeInstanceOf(PipeProducer);
    });
    test('expected results', () => {
        expect(Producer.prototype[__construct__]).toHaveBeenCalledWith(client, producerOptions);
    });
});

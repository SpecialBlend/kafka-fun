import { Callable } from '@specialblend/callable';
import { PipeSender, createSender } from './sender';
import { Printable } from './printer';
import { Producer } from 'kafka-node';
import { __construct__ } from '../../__mocks__/support';
import { PipeProducer } from './producer';
import { __kafkaProducerQueryMockStatus__, __producerSend__ } from '../../__mocks__/kafka-node';

describe('PipeSender', () => {
    let sender;
    const client = Symbol('client');
    const topic = Symbol('topic');
    const payloadOptions = Symbol('payloadOptions');
    const producerOptions = Symbol('producerOptions');
    beforeAll(() => {
        sender = new PipeSender(client, topic, payloadOptions, producerOptions);
    });
    test('is a function', () => {
        expect(PipeSender).toBeFunction();
    });
    test('calls underlying Consumer with expected props', () => {
        expect(Producer.prototype[__construct__]).toHaveBeenCalledWith(client, producerOptions);
    });
    describe('instance', () => {
        test('is instance of PipeProducer', () => {
            expect(sender).toBeInstanceOf(PipeProducer);
        });
        test('has expected props', () => {
            expect(sender).toHaveProperty('topic', topic);
            expect(sender).toHaveProperty('payloadOptions', payloadOptions);
        });
        describe('send method', () => {
            test('calls underlying Producer.send with expected data', () => {
                const messages = Symbol('messages');
                sender.send(messages);
                expect(__producerSend__).toHaveBeenCalledWith({
                    ...payloadOptions,
                    topic,
                    messages,
                });
            });
        });
    });
    describe('is Callable', () => {
        test('is instance of Callable', () => {
            expect(sender).toBeInstanceOf(Callable);
        });
        test('when called, functions as send method', () => {
            const message = Symbol('message');
            const send = jest.spyOn(sender, 'send');
            sender(message);
            expect(send).toHaveBeenCalledWith(message);
        });
    });
    test('is Printable', () => {
        expect(PipeSender.prototype).toHaveProperty('print', Printable.prototype.print);
    });
});

describe('createSender', () => {
    const client = Symbol('client');
    const producerOptions = Symbol('producerOptions');
    test('is a function', () => {
        expect(createSender).toBeFunction();
    });
    test('returns a Promise', () => {
        expect(createSender(client, producerOptions)).toBeInstanceOf(Promise);
    });
    test('returned Promise resolves to a Sender', async() => {
        expect(await createSender(client, producerOptions)).toBeInstanceOf(PipeSender);
    });
    test('returned Promise rejects on error', async() => {
        const testErr = new Error('test.error.wzexsrdctfvygbunijmok,l');
        try {
            __kafkaProducerQueryMockStatus__.mockRejectedValueOnce(testErr);
            await createSender(client, producerOptions);
        } catch (err) {
            expect(err).toBe(testErr);
        }
    });
});

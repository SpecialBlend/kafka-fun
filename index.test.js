/* eslint-disable no-shadow,no-sync */

describe('index.js', () => {
    const kafka = require('.');
    test('exports expected functions and classes', () => {
        expect(kafka).toHaveProperty('PipeConsumer', expect.any(Function));
        expect(kafka).toHaveProperty('createConsumer', expect.any(Function));
        expect(kafka).toHaveProperty('createProducer', expect.any(Function));
        expect(kafka).toHaveProperty('createTransformer', expect.any(Function));
    });
    test('exports base classes', () => {
        expect(kafka).toHaveProperty('Client', expect.any(Function));
        expect(kafka).toHaveProperty('Consumer', expect.any(Function));
        expect(kafka).toHaveProperty('Producer', expect.any(Function));
    });
    test('exports mocks', () => {
        const mocks = require('./dist/__mocks__');
        expect(mocks).toHaveProperty('__kafkaClientConstruct', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaConsumerConstruct', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaConsumerRegisterEventListener', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaProducerConstruct', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaProducerRegisterEventListener', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaProducerSend', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaProducerOnError', expect.any(Function));
        expect(mocks).toHaveProperty('__kafkaProducerQueryMockStatus', expect.any(Function));
    });
});

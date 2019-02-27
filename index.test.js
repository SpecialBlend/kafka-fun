/* eslint-disable no-shadow,no-sync */

describe('index.js', () => {
    const kafka = require('.');
    test('exports expected functions and classes', () => {
        expect(kafka).toHaveProperty('Client', expect.any(Function));
        expect(kafka).toHaveProperty('PipeConsumer', expect.any(Function));
        expect(kafka).toHaveProperty('PipeProducer', expect.any(Function));
        expect(kafka).toHaveProperty('createConsumer', expect.any(Function));
        expect(kafka).toHaveProperty('createSender', expect.any(Function));
        expect(kafka).toHaveProperty('createTransformer', expect.any(Function));
    });
    test('exports base classes', () => {
        expect(kafka).toHaveProperty('KafkaClient', expect.any(Function));
        expect(kafka).toHaveProperty('Consumer', expect.any(Function));
        expect(kafka).toHaveProperty('Producer', expect.any(Function));
    });
});

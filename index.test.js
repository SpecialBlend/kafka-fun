/* eslint-disable no-shadow,no-sync */

describe('index.js', () => {
    const kafka = require('.');
    test('exports expected functions and classes', () => {
        expect(kafka).toHaveProperty('PipeConsumer', expect.any(Function));
        expect(kafka).toHaveProperty('createConsumer', expect.any(Function));
        expect(kafka).toHaveProperty('createProducer', expect.any(Function));
        expect(kafka).toHaveProperty('createTransformer', expect.any(Function));
    });
    test('exports legacy classes', () => {
        expect(kafka).toHaveProperty('Client', expect.any(Function));
        expect(kafka).toHaveProperty('Consumer', expect.any(Function));
        expect(kafka).toHaveProperty('Producer', expect.any(Function));
    });
});

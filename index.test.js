/* eslint-disable no-shadow,no-sync */

describe('index.js', () => {
    const k = require('.');
    test('exports expected functions and classes', () => {
        expect(k).toHaveProperty('PipeConsumer', expect.any(Function));
        expect(k).toHaveProperty('createConsumer', expect.any(Function));
        expect(k).toHaveProperty('createProducer', expect.any(Function));
        expect(k).toHaveProperty('createTransformer', expect.any(Function));
    });
});

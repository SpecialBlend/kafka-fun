import * as moduleES from './dist/index.esm';
import * as moduleCJS from './dist/index.cjs';
const moduleUMD = require('./dist/index.umd');

describe('exports correctly', () => {
    test.each([
        'Client',
        'PipeConsumer',
        'PipeProducer',
        'PipeSender',
        'PipeTransformer',
        'createConsumer',
        'createProducer',
        'createSender',
        'createTransformer',
    ])('has method %p', prop => {
        expect(moduleES).toHaveProperty(prop, expect.any(Function));
        expect(moduleCJS).toHaveProperty(prop, expect.any(Function));
        expect(moduleUMD).toHaveProperty(prop, expect.any(Function));
    });
});

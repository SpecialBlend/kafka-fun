import * as moduleES from './dist/index.esm';
import * as moduleCJS from './dist/index.cjs';
const moduleUMD = require('./dist/index.umd');

test('exports correctly', () => {
    expect(moduleES).toHaveProperty('PipeConsumer', expect.any(Function));
    expect(moduleCJS).toHaveProperty('PipeConsumer', expect.any(Function));
    expect(moduleUMD).toHaveProperty('PipeConsumer', expect.any(Function));
});

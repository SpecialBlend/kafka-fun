import moduleES from './dist/index.esm';
import moduleCJS from './dist/index.cjs';
const moduleUMD = require('./dist/index.umd');

test('exports are importable', () => {
    expect(moduleUMD).toBeFunction();
    expect(moduleES).toBeFunction();
    expect(moduleCJS).toBeFunction();
});

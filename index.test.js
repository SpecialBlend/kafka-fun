/* eslint-disable no-shadow,no-sync */

const process = require('child_process');

describe('index.js', () => {
    const k = require('.');
    test('exports expected functions and classes', () => {
        expect(k).toHaveProperty('PipeConsumer', expect.any(Function));
        expect(k).toHaveProperty('createConsumer', expect.any(Function));
        expect(k).toHaveProperty('createProducer', expect.any(Function));
        expect(k).toHaveProperty('createTransformer', expect.any(Function));
    });
    test('dist is up to date', () => {
        const oldHash = process.execSync('cat dist/* | md5').toString();
        process.execSync('npm run build');
        const newHash = process.execSync('cat dist/* | md5').toString();
        expect(newHash).toBe(oldHash);
    });
});

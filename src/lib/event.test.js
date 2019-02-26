import { EventEmitter } from 'events';
import { promisifyEmitter } from './event';

describe('promisifyEmitter', () => {
    test('returns a promise', () => {
        const emitter = new EventEmitter();
        const promisifiedEmitter = promisifyEmitter(emitter, '__success', '__fail');
        expect(promisifiedEmitter).toBeInstanceOf(Promise);
    });
    test('resolves as expected', () => {
        const emitter = new EventEmitter();
        const testData = 'test.data';
        const testResolverEvent = '__success';
        const testRejecterEvent = '__fail';
        promisifyEmitter(emitter, testResolverEvent, testRejecterEvent)
            .then(data => {
                expect(data).toBe(testData);
            })
            .catch(err => {
                expect(err).toBeUndefined();
            });
        emitter.emit('__success', testData);
    });
    test('rejects as expected', () => {
        const emitter = new EventEmitter();
        const testError = new Error('test.error');
        const testResolverEvent = '__success';
        const testRejecterEvent = '__fail';
        promisifyEmitter(emitter, testResolverEvent, testRejecterEvent)
            .then(data => {
                expect(data).toBeUndefined();
            })
            .catch(err => {
                expect(err).toBe(testError);
            });
        emitter.emit('__fail', testError);
    });
});

import * as R from 'ramda';

/**
 * Listen to EventEmitter
 * @param {EventEmitter} emitter Instance of EventEmitter
 * @param {String} resolveEvent The event type on which to invoke callback
 * @param {String} rejectEvent The event type on which to throw errors
 * @returns {{map: map}}
 */
export const createListener = R.curry((resolveEvent, rejectEvent, emitter) =>
    callback => {
        emitter.on(resolveEvent, callback);
        emitter.on(rejectEvent, err => {
            throw err;
        });
    }
);

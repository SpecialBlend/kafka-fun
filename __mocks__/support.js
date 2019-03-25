import { EventEmitter } from 'events';
import { Printable } from '../src/lib/printer';

require('jest-extended');

expect.extend({
    toBePrintable(received) {
        expect(received).toHaveProperty('print', Printable.prototype.print);
    },
});

const { log, info, debug, warn, error } = console;

/**
 * Mute console output while running tests,
 * unless process.env.DEBUG is set to true
 */
beforeEach(() => {
    if (process.env.DEBUG === 'true') {
        console.log = jest.fn(log);
        console.info = jest.fn(info);
        console.debug = jest.fn(debug);
        console.warn = jest.fn(warn);
        console.error = jest.fn(error);
    } else {
        console.log = jest.fn();
        console.info = jest.fn();
        console.debug = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
    }
});

afterAll(() => {
    console.log = log;
    console.info = info;
    console.debug = debug;
    console.warn = warn;
    console.error = error;
});

export const __construct__ = Symbol('__construct__');

export class GenericMockClass extends EventEmitter {
    constructor(...props) {
        super(...props);
        this[__construct__](...props);
    }
}

export const GenericMockType = () => {
    const generic = class extends GenericMockClass {};
    generic.prototype[__construct__] = jest.fn();
    return generic;
};

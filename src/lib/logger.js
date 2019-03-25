import * as R from 'ramda';
import throttle from 'lodash.throttle';
import { PipeSender } from './sender';
import { EventEmitter } from 'events';

const defaultThrottleMap = {
    error: 0,
    warn: 10,
    info: 30,
    debug: Infinity,
};

export class PipeLoggerMessageStack extends EventEmitter {
    constructor(logger, name, delay, printer) {
        super();
        this.logger = logger;
        this.name = name;
        this.stack = [];
        this.printer = printer;
        this.handlePush = throttle(this.flush, delay);
        this.on('push', this.handlePush);
    }
    push(message) {
        this.stack.push(message);
        this.emit('push', message);
    }
    flush() {
        this.logger(R.map(this.printer, [...this.stack]));
        this.stack = [];
    }
}

const createMessageStack = R.memoizeWith(
    (logger, name) => [logger, name],
    (logger, name, delay, printer) =>
        new PipeLoggerMessageStack(logger, delay, printer)
);

export class PipeLogger extends PipeSender {

    constructor(client, topic) {
        super(client, topic);
        this.messageStacks = [];
        this.token = Symbol(PipeLogger);
    }
    withStack(name, delay, printer) {
        if (typeof this.messageStacks[name] === 'undefined') {
            this.messageStacks[name] = createMessageStack(this, name, delay, printer);
        }
        return this;
    }
}

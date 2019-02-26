import * as R from 'ramda';
import { EventEmitter } from 'events';
import { createReader } from '../src/lib/kafka';
import { createListener } from '../src/lib/event';

const worker = new EventEmitter;
const reader = createReader(worker);

console.log(reader);

const pipeline = R.pipe(
    R.tap(i => console.log('value', i)),
    R.multiply(2),
    R.tap(x => console.log('transformed value', x)),
);

R.map(pipeline, reader);

let i = 0;
setInterval(() => {
    worker.emit('message', i++);
}, 1000);

setTimeout(() => {
    worker.emit('error', new Error('test.error'));
}, 5000);

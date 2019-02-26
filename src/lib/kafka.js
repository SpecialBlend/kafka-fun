import * as R from 'ramda';
import { EventEmitter } from 'events';
import { createListener } from './event';
import { Consumer, ConsumerGroup, ConsumerGroupStream } from 'kafka-node';

export const createReader = R.compose(
    R.objOf('map'),
    createListener('message', 'error'),
);

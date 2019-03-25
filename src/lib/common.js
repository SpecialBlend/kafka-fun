import * as R from 'ramda';
import util from 'util';

export const promisify = R.memoizeWith(R.prop('prototype'), util.promisify);

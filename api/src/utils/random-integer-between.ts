import * as _ from 'lodash';

export function randomIntegerBetween(min: number, max: number): number {
  return _.random(min, max);
}

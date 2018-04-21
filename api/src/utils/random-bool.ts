import {randomIntegerBetween} from './random-integer-between';

export function randomBool(): boolean {
  return !!randomIntegerBetween(0, 1);
}

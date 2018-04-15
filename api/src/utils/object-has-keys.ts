/**
 * Returns true if the provided object has "contents"
 *
 * Sometimes needed since empty object `{}` is true in javascript
 * */
export function objectHasKeys(obj: {} | null | undefined | { [key: string]: any }) {
  if (Array.isArray(obj)) {
    throw new Error('obj cant be of type Array!');
  }
  return obj ? Object.keys(obj).length > 0 && obj.constructor === Object : false;
}

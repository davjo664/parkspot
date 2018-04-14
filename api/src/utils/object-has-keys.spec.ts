import {objectHasKeys} from './object-has-keys';

describe('objectHasKeys', () => {

  describe('for undefined / null values', function () {
    it('should return false', () => {
      expect(objectHasKeys(null)).toBe(false);
    });

    it('should return false', () => {
      expect(objectHasKeys(undefined)).toBe(false);
    });

  });

  describe('for empty objects', function () {
    it('should return false', () => {
      expect(objectHasKeys({})).toBe(false);
    });
  });


  describe('for Arrays', function () {
    it('should throw', () => {
      const call = () => {
        objectHasKeys([]);
      };
      expect(call).toThrow('obj cant be of type Array!');
    });
  });

  describe('for objects', function () {
    it('should return true', () => {
      expect(objectHasKeys({a: 1})).toBe(true);
    });
  });
});

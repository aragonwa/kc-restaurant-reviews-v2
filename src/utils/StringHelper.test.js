import StringHelper from './StringHelper';

describe('StringHelper', () => {
  describe('capitalCase', () => {
    test('should return a string formated for capitalCase', () => {
      const restaurantName = "my great place";
      const expected = "My Great Place";

      const result = StringHelper.capitalCase(restaurantName);
      expect(result).toEqual(expected);
    });
  });
  describe('phoneNumFormat', () => {
    test('should check if phone exists', () => {
      const phone = '';
      const expected = '';

      const result = StringHelper.phoneNumFormat(phone);
      expect(result).toEqual(expected);
    });
    test('should format phone number', () => {
      const phone = '1234567890';
      const expected = '(123) 456-7890';

      const result = StringHelper.phoneNumFormat(phone);
      expect(result).toEqual(expected);
    });
  });
});

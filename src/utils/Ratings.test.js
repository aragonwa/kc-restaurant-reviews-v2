import Ratings from './Ratings';

describe('Ratings', () => {
  describe('getRatings', () => {
     test('should return okay when rating is 1', () => {
      const expectedResult = {
        img: 'excellent',
        string: 'Excellent'
      };
      const result = Ratings.getRatings(1);

      // assert
      expect(result).toEqual(expectedResult);
    });
     test('should return okay when rating is 2', () => {
      const expectedResult = {
        img: 'good',
        string: 'Good'
      };
      const result = Ratings.getRatings(2);

      // assert
      expect(result).toEqual(expectedResult);
    });
     test('should return okay when rating is 3', () => {
      const expectedResult = {
        img: 'okay',
        string: 'Okay'
      };
      const result = Ratings.getRatings(3);

      // assert
      expect(result).toEqual(expectedResult);
    });
    test('should return okay when rating is 4', () => {
      const expectedResult = {
        img: 'needstoimprove',
        string: 'Needs to improve'
      };
      const result = Ratings.getRatings(4);

      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});

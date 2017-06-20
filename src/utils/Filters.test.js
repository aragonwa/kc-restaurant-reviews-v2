import Filters from './Filters';

describe('Filters', () => {
  describe('filterRestaurants', () => {
    test('should filter restaurants by business name', () => {
      // arrange
      const initialState = {
        restaurants: [
          {businessName: 'Subway'},
          {businessName: 'Subway 2'},
          {businessName: "Alberto's tacos"},
          {businessName: 'McDonalds'},
          {businessName: 'Pizza Place'},
          {businessName: 'Coffee Joe'},
          {businessName: 'Salad Sam'}
        ]
      };
      // It ignores case
      const filter = 'SubWay';

      // act
      const result = Filters.filterRestaurants(initialState.restaurants, filter);

      // assert
      expect(result.length).toEqual(2);
    });
  });
  describe('filterPagerItems', () => {
    const initialState = {
      restaurants: [
        {businessName: 'Subway'},
        {businessName: 'The Caviar Shop'},
        {businessName: "Alberto's tacos"},
        {businessName: 'McDonalds'},
        {businessName: 'Pizza Place'},
        {businessName: 'Coffee Joe'},
        {businessName: 'Salad Sam'},
        {businessName: 'The Grand'},
        {businessName: 'Copper'},
        {businessName: 'Rare'},
        {businessName: 'Victory'},
        {businessName: 'Clarity'},
        {businessName: 'Empress'},
        {businessName: 'Simmer'},
        {businessName: 'Down'},
        {businessName: 'Catch'},
        {businessName: 'Bounty'},
        {businessName: 'Hungry'},
        {businessName: 'Canteen'},
        {businessName: 'Beach'},
        {businessName: 'Chamber'},
        {businessName: 'Amber'},
        {businessName: 'Rose'},
        {businessName: 'Saffron'},
        {businessName: 'Afternoon'},
        {businessName: 'Thai'},
        {businessName: 'Bear'},
        {businessName: 'Vineyard'}
      ]
    };
    test('should return the second set of 10 restaurants', () => {
      // arrange
      const pagerNum = '2';
      const expectedResult =
      [{businessName: 'Victory'},
        {businessName: 'Clarity'},
        {businessName: 'Empress'},
        {businessName: 'Simmer'},
        {businessName: 'Down'},
        {businessName: 'Catch'},
        {businessName: 'Bounty'},
        {businessName: 'Hungry'},
        {businessName: 'Canteen'},
        {businessName: 'Beach'}];

      // act
      const result = Filters.filterPagerItems(initialState.restaurants, pagerNum);

      // assert
      expect(result).toEqual(expectedResult);
    });
    test('should return the final set of 8 restaurnts', () => {
      // arrange
      const pagerNum = '3';
      const expectedResult =
      [{businessName: 'Chamber'},
        {businessName: 'Amber'},
        {businessName: 'Rose'},
        {businessName: 'Saffron'},
        {businessName: 'Afternoon'},
        {businessName: 'Thai'},
        {businessName: 'Bear'},
        {businessName: 'Vineyard'}];

      // act
      const result = Filters.filterPagerItems(initialState.restaurants, pagerNum);

      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('shuffle', () =>{
    test('should shuffle array', () => {
      const initialState = {
        restaurants: [
          {businessName: 'Subway'},
          {businessName: 'Subway 2'},
          {businessName: "Alberto's tacos"},
          {businessName: 'McDonalds'},
          {businessName: 'Pizza Place'},
          {businessName: 'Coffee Joe'},
          {businessName: 'Salad Sam'}
        ]
      };
      const result = Filters.shuffle(...initialState.restaurants);
      expect(result).not.toEqual(initialState.restaurants);
    });
  });
  describe('alphaSort', () =>{
    test('should sort items aphabetically', () => {
      const initialState = {
        restaurants: [
          {businessName: 'Subway'},
          {businessName: "Alberto's tacos"},
          {businessName: 'McDonalds'},
          {businessName: 'Pizza Place'},
          {businessName: 'Subway 2'},
          {businessName: 'Coffee Joe'},
          {businessName: 'Salad Sam'}
        ]
      };
      const result = Filters.alphaSort(initialState.restaurants);
      expect(result[0].businessName).toEqual("Alberto's tacos");
    });
  });
});

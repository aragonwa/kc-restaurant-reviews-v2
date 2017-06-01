import React from 'react';
import { shallow } from 'enzyme';
import RestaurantReviewsList from './RestaurantReviewsList';

function setup (restaurants) {
  const props = {
    restaurantReviews: (restaurants)?[restaurants] : [],
    activeItem: '1234',
    pagerNum: 1,
    setActiveItem: () => {},
    updateFilter: () => {},
    setActiveItemOnClick: () => {}
  };
  return shallow(<RestaurantReviewsList {...props} />);
}

describe('RestaurantReviewsList', () => {
  test('should have id restaurant-list', () => {
    const wrapper = setup({
      id: '1234',
      businessName: 'My place',
      businessAddress: '1234 Street',
      businessCity: 'Seattle'
    });
    const actual = wrapper.find('#restaurant-list').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
   test('should return alert if no restaurants', () => {
    const wrapper = setup();

    const actual = wrapper.find('#restaurant-list .alert').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});

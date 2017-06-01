import React from 'react';
import { shallow } from 'enzyme';
import RestaurantListItem from './RestaurantListItem';

function setup () {
  const props = {
    item: {
      grade: 1,
      phone: '555-555-5555'
    },
    activeItem: true,
    setActiveItemOnClick: () => {}
  };
  return shallow(<RestaurantListItem {...props} />);
}

describe('RestaurantListItem', () => {
  test('should have class active when active', () => {
    const wrapper = setup();

    const actual = wrapper.find('.active').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
  test('should show phone when phone is provided', () => {
    const wrapper = setup();
    const actual = wrapper.find('.show').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});

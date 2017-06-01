import React from 'react';
import { shallow } from 'enzyme';
import Paginate from './Paginate';

function setup(pagerNum=1, restaurants=[]) {
  const props = {
    filter: '',
    restaurants,
    setActiveItem: ()=> {},
    itemsPerPage: 10,
    pagerNum,
    increasePagerNum: () => {},
    decreasePagerNum: () => {}
  };
  return shallow(<Paginate {...props} />);
}

describe('Paginate', () => {
  test('should have class ul with pagination class', () => {
    const wrapper = setup();

    const actual = wrapper.find('ul.pagination').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
  test('should activate previous disabled class when pagerNum <= 1', () => {
    const wrapper = setup(0);
    const actual = wrapper.find('.previous.disabled').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
  test('if you run out of restaurants to display disable next', () => {
    const wrapper = setup(1, [{name:'name1'},{name:'name2'}]);
    const actual = wrapper.find('.next.disabled').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});

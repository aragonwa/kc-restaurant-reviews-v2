import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from './SearchInput';

function setup (searchTerm) {
  const props = {
    name: 'mySearch',
    setActiveItem: () => {},
    searchTerm,
    updateFilter: () => {}
  };
  const context = {
    router: {
      push: () => {}
    }
  };
  return shallow(<SearchInput {...props}/>, {context});
}

describe('SearchInput', () => {
  test('Value of input is cat', () => {
    const wrapper = setup('cat');
    const actual = wrapper.find('input').props().value;
    const expected = 'cat';
    expect(actual).toBe(expected);
  });
  test('Value of input should be dog and show button', () => {
    const wrapper = setup('cat');
    wrapper.find('input').simulate('change', {target: {value:'dog'}});
     const actual = wrapper.find('input').props().value;
    const expected = 'dog';
    expect(actual).toBe(expected);
    expect(wrapper.find('.btn-danger').length).toBe(1);
  });
  test('Clear clears input val and removes clear search btn', () => {
    const wrapper = setup('cat');
    wrapper.find('.btn-danger').simulate('click');
    const actual = wrapper.find('input').props().value;
    const expected = '';
    expect(actual).toBe(expected);
    expect(wrapper.find('.btn-danger.btn-xs.hidden').length).toBe(1);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import DetailsInspectionRow from './DetailsInspectionRow';

function setup (violations) {
  const props = {
    inspection: {
    violations},
    inspectionSerialNum: 123233,
    inspectionIndex: 1234,
    inspectionType: 129,
    formatDate: () => {
    }
  };
  return mount(<table><DetailsInspectionRow {...props} /></table>);
}
describe('DetailsInspectionRow', () => {
 test('should create two violation rows', () => {
    const wrapper = setup([{
      violationType: 'red',
      violationDescr: 'Bad food'
    },
      {
        violationType: 'red',
        violationDescr: 'Bad food'
      }
    ]);
    const actual = wrapper.find('.fa-color-danger').length;
    const expected = 2;
    expect(actual).toBe(expected);
  });
 test('should not create violation row', () => {
    const wrapper = setup([]);
    const actual = wrapper.find('.fa-color-danger').length;
    const expected = 0;
    expect(actual).toBe(expected);
  });
 test('should open inspection row on click', () => {
    const wrapper = setup([{
      violationType: 'red',
      violationDescr: 'Bad food'
    },
      {
        violationType: 'red',
        violationDescr: 'Bad food'
      }
    ]);
    wrapper.find('tr[data-toggle]').simulate('click');
    const actual = wrapper.find('.fa-minus').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});

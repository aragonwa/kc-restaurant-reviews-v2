import React from 'react';
import { mount } from 'enzyme';
import Details from './Details';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

function setup() {
  const props = {
    params: {},
    history: {}
  };
  const context = {
    router: {
      push: ()=>{}
    }
  };

  return mount(<Details {...props} />, {context});
}

describe('Details', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test('should do something', () => {
    fetchMock.get('*', []);
    const wrapper = setup();
    const actual = wrapper.find('.fa.fa-spinner').length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
   test('calls componentDidMount', () => {
    fetchMock.get('*', []);
    sinon.spy(Details.prototype, 'componentDidMount');
    const wrapper = setup();
    expect(Details.prototype.componentDidMount.calledOnce).toBe(true);
  });

});

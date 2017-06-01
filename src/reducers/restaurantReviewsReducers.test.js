import restaurantReviewsReducers from './restaurantReviewsReducers';
import * as actions from '../actions/restaurantReviewsActions';

describe('Restaurant Reviews Reducer', () => {
  test('should increase update filter when passed UPDATE_FILTER', () => {
    // arrange
    const initialState = {filter: '', pagerNum: 6};
    const newFilter = 'cat';
    const action = actions.updateFilter(newFilter);

    // act
    const newState = restaurantReviewsReducers(initialState, action);

    // assert
    expect(newState.filter).toEqual('cat');
    expect(newState.pagerNum).toEqual(1);
  });

  test('should set a new active item when passed SET_ACTIVE_ITEM', () => {
    const initalState = {activeItem: 4, scroll: true };
    const newActiveItem = 10;
    const action = actions.setActiveItem(newActiveItem);

    // act
    const newState = restaurantReviewsReducers(initalState, action);

    // assert
    expect(newState.activeItem).toEqual(10);
  });
  test('should increase pager count when passed INCREASE_PAGER_NUM', () => {
    // arrange
    const initialState = {pagerNum: 1};
    const pagerNum = initialState.pagerNum + 1;
    const action = actions.increasePagerNum(pagerNum);

    // act
    const newState = restaurantReviewsReducers(initialState, action);

    // assert
    expect(newState.pagerNum).toEqual(2);
  });
  test('should decrease pager count when passed DECREASE_PAGER_NUM', () => {
    // arrange
    const initialState = {pagerNum: 3};
    const pagerNum = initialState.pagerNum - 1;
    const action = actions.decreasePagerNum(pagerNum);

    // act
    const newState = restaurantReviewsReducers(initialState, action);

    // assert
    expect(newState.pagerNum).toEqual(2);
  });
});

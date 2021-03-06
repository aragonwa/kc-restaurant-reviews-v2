import React from 'react';
import PropTypes from 'prop-types';
import {PAGER_ITEMS_PER_PAGE as itemsPerPage} from '../constants/appSettings';

class Paginate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.decreasePagerNum = this.decreasePagerNum.bind(this);
    this.increasePagerNum = this.increasePagerNum.bind(this);
  }

  decreasePagerNum (e){
    e.preventDefault();
    const pagerNum = this.props.pagerNum;
    if(pagerNum <= 1){
      return;
    }
    this.props.decreasePagerNum(pagerNum - 1);
    this.props.setActiveItem(null);
  }

  increasePagerNum (e){
    e.preventDefault();
    const {restaurants} = this.props;
    if(this.props.pagerNum * itemsPerPage >= restaurants.length){
      return;
    }
    this.props.increasePagerNum(this.props.pagerNum + 1);
    this.props.setActiveItem(null);
  }

  render() {
    const {pagerNum} = this.props;
    const {restaurants} = this.props;
    let previousDisabledClass = '';
    let nextDisabledClass = '';

    if(pagerNum <= 1) {
      previousDisabledClass = 'previous disabled';
    } else {
      previousDisabledClass = 'previous';
    }
    if(pagerNum * itemsPerPage >= restaurants.length) {
      nextDisabledClass = 'next disabled';
    } else {
      nextDisabledClass = 'next';
    }

    return (
      <div className="col-sm-12">
        <nav className="center-block">
          <ul className="pagination">
            <li className={previousDisabledClass} onClick={this.decreasePagerNum}><a href="#">Previous</a></li>
            <li className={nextDisabledClass} onClick={this.increasePagerNum}><a href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

Paginate.propTypes = {
  decreasePagerNum: PropTypes.func.isRequired,
  increasePagerNum: PropTypes.func.isRequired,
  pagerNum: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number
};

export default Paginate;

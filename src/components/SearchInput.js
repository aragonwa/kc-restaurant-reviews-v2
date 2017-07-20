import React from 'react';
import PropTypes from 'prop-types';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textVal: this.props.searchTerm || ''
      // inputError: false
    };
    this.restaurantReviewsFilterKeyUp = this.restaurantReviewsFilterKeyUp.bind(this);
    this.searchInputKeypress = this.searchInputKeypress.bind(this);
    this.searchInputOnClick = this.searchInputOnClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm) {
      this.setState({ textVal: nextProps.searchTerm });
    } else {
      this.setState({ textVal: '' });
    }
  }

  restaurantReviewsFilterKeyUp(e) {
    // if(this.state.inputError){
    //   return;
    // }
    if (e.charCode === 13) {
      this.updateFilter();
    }
  }

  searchInputKeypress(e) {
    // if(e.target.value.length < 2) {
    //   this.setState({inputError: true});
    // } else {
    //   this.setState({inputError: false});
    // }
    //  if (e.charCode === 13 && !this.state.inputError) {
    if (e.charCode === 13 && !this.state.inputError) {
      this.updateFilter(this.state.textVal);
    } else {
      this.setState({ textVal: e.target.value });
    }
  }

  searchInputOnClick() {
    // if(this.state.inputError){
    //   return;
    // }
    this.updateFilter();
  }

  clearSearch() {
    this.props.updateFilter('');
    this.setState({ textVal: '' });
    // this.props.history.push('/');
    this.context.router.push('/');
  }

  updateFilter() {
    this.props.updateFilter(this.state.textVal);
    this.props.setActiveItem(null);
    this.context.router.push('/search/' + this.state.textVal);
    // this.props.history.push('/search/'+ this.state.textVal);
  }

  render() {
    const { textVal } = this.state;
    const { inputError } = this.state;
    return (
      <div className="col-sm-12 location-input">
        <br />
        <div className="row">
        <div className="col-sm-9">
          <label htmlFor="restaurantInput">Search</label>
          <div className={(inputError) ? 'has-error' : ''}>
            <div className="input-group">
              {/* Change placeholder to search*/}
              <input type="text" className="form-control" id="restaurantInput" placeholder="Name" value={textVal} onChange={this.searchInputKeypress} onKeyPress={this.restaurantReviewsFilterKeyUp} />
              <span className="input-group-btn">
                <button className={(inputError) ? 'btn btn-danger' : 'btn btn-primary'} type="button" onClick={this.searchInputOnClick} aria-label="Search restaurant inspections"><span className="fa fa-search" /></button>
              </span>
            </div>
            <label className={'help-block text-danger ' + ((inputError) ? 'show' : 'hidden')} htmlFor="restaurantInput">Enter at least 2 characters</label>
          </div>
          <button style={{ marginBottom: '15px' }} className={'btn btn-danger btn-xs' + ((textVal) ? '' : ' hidden')} onClick={this.clearSearch} type="button">Clear search</button>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-primary">Near me <span className="fa fa fa-crosshairs" /></button>
          </div>
        </div>

      </div>
    );
  }
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setActiveItem: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  history: PropTypes.object,
  searchTerm: PropTypes.string
};

SearchInput.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchInput;

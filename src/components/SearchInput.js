import React from 'react';
import PropTypes from 'prop-types';
import SearchInputDropdown from './SearchInputDropdown';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textVal: this.props.searchTerm || '',
      searchType : 'name'
    };
    this.restaurantReviewsFilterKeyUp = this.restaurantReviewsFilterKeyUp.bind(this);
    this.searchInputKeypress = this.searchInputKeypress.bind(this);
    this.searchInputOnClick = this.searchInputOnClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.setSearchType = this.setSearchType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm) {
      this.setState({ textVal: nextProps.searchTerm });
    } else {
      // this.setState({ textVal: '' });
    }
  }

  restaurantReviewsFilterKeyUp(e) {
    // if(this.state.inputError){
    //   return;
    // }
    if (e.charCode === 13) {
      // this.updateFilter();
      this.updateSearch();
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
      // this.updateFilter(this.state.textVal);
      this.updateSearch();
    } else {
      this.setState({ textVal: e.target.value });
    }
  }

  searchInputOnClick() {
    // if(this.state.inputError){
    //   return;
    // }
   //this.updateFilter();
   this.updateSearch();
  }
  setSearchType(type) {
    this.setState({searchType: type});
    //this.props.searchRestaurants('starbucks');
  }

  clearSearch() {
    this.props.updateFilter('');
    this.setState({ textVal: '' });
    // this.props.history.push('/');
   // this.context.router.push('/');
  }

  updateFilter() {
    this.props.updateFilter(this.state.textVal);
    this.props.setActiveItem(null);
    this.context.router.push('/search/' + this.state.textVal);
    // this.props.history.push('/search/'+ this.state.textVal);
  }
  updateSearch(){
    this.props.setActiveItem(null);
    const {searchType, textVal} = this.state;
    if(searchType === 'name'){
      this.props.searchRestaurants(textVal);
    }
    if(searchType === 'city'){
      this.props.searchCity(textVal);
    }
    if(searchType === 'zip'){
      this.props.searchZip(textVal);
    }
  }

  render() {
    const { textVal } = this.state;
    const { inputError, searchType } = this.state;

    // TODO: move to utilities
    let searchTypeText;
    switch (searchType){
      case 'name':
        searchTypeText = 'Restaurant name ';
        break;
      case 'zip':
        searchTypeText = 'Zip code ';
        break;
      case 'city':
        searchTypeText = 'City ';
        break;
    }
    return (
      <div className="col-sm-12 location-input">
        <br />
        <div className="row">
        <div className="col-sm-12">
          <label htmlFor="restaurantInput">Search</label>
          <div className={(inputError) ? 'has-error' : ''}>
            <div className="input-group">
              <SearchInputDropdown searchTypeText={searchTypeText} setSearchType={this.setSearchType} searchType={searchType}/>
              <input type="text" className="form-control" id="restaurantInput" placeholder="Search" value={textVal} onChange={this.searchInputKeypress} onKeyPress={this.restaurantReviewsFilterKeyUp} />
              <span className="input-group-btn">
                <button className={(inputError) ? 'btn btn-danger' : 'btn btn-primary'} type="button" onClick={this.searchInputOnClick} aria-label="Search restaurant inspections"><span className="fa fa-search" /></button>
              </span>
            </div>
            <label className={'help-block text-danger ' + ((inputError) ? 'show' : 'hidden')} htmlFor="restaurantInput">Enter at least 2 characters</label>
          </div>
          <button style={{ marginBottom: '15px' }} className={'btn btn-danger btn-xs' + ((textVal) ? '' : ' hidden')} onClick={this.clearSearch} type="button">Clear search</button>
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
  searchTerm: PropTypes.string,
  searchRestaurants: PropTypes.func,
  searchCity: PropTypes.func,
  searchZip: PropTypes.func
};

SearchInput.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchInput;

import React from 'react';
import PropTypes from 'prop-types';
// import {browserHistory} from 'react-router';
import { getBusinessApi, getInspectionsApi } from '../api/api';
import StringHelper from '../utils/StringHelper';
import Ratings from '../utils/Ratings';
import {Modal} from 'react-bootstrap';
import DetailsInspectionRow from './DetailsInspectionRow';

class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // State for Component
    this.state = {
      showModal: true,
      business: [],
      inspections: [],
      loading: true,
      inspectionsLoading: true,
      errorLoading: false
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
    getBusinessApi(this.props.params.id).then((response) => {
      this.setState({ loading: false });
      this.setState({ business: response[0] });
    }).catch(error => {
      this.setState({ errorLoading: true });
      this.setState({ loading: false });
      throw (error);
    });
    getInspectionsApi(this.props.params.id).then((response) => {
      this.setState({ loading: false, inspectionsLoading: false });
      this.setState({ inspections: response });
    }).catch(error => {
      this.setState({ errorLoading: true });
      this.setState({ loading: false });
      throw (error);
    });
  }

  componentWillUnmount() {
    this.setState({ loading: true });
    this.setState({ business: [] });
    this.setState({ inspections: [] });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
    this.context.router.push('/');
  }

  formatDate(str) {
    const date = str.slice(0, 10).split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return `${month}/${day}/${year}`;
  }
  loadingModal() {
    return (
      <Modal show={this.state.showModal} onHide={this.hideModal} bsSize="large">
        <div className="text-center">
          <span className="fa fa-spinner fa-spin fa-4x" />
        </div>
      </Modal>
    );
  }

  loadingModalError() {
    return (
      <Modal show={this.state.showModal} onHide={this.hideModal} bsSize="large">
        <div className="col-sm-12">
          <div className="alert alert-danger"><h2>An error occurred while loading restaurant information.</h2></div>
        </div>
      </Modal>
    );
  }

  getInspectionRows(inspectionsLoading, inspections) {
    if (inspectionsLoading) {
      return (
        <div className="text-center">
          <span className="fa fa-spinner fa-spin fa-4x" />
        </div>
      );
    } else {
      const detailsInspectionRows = inspections.map((inspection, index) => {
        return (
          <DetailsInspectionRow
            inspection={inspection}
            formatDate={this.formatDate}
            key={index}
            inspectionIndex={index}
          />
        );
      });
      return (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Inspection type</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            {detailsInspectionRows}
          </table>
        </div>);
    }
  }

  render() {
    const { isOpen, business, inspections, loading, errorLoading, inspectionsLoading } = this.state;
    const rating = Ratings.getRatings(business.businessGrade);

    //TODO: add to stylesheet
    const style = { display: 'inline' };

    if (loading) {
      return this.loadingModal();
    }
    if (errorLoading || business.length <= 0) {
      return this.loadingModalError();
    }

    //Sort inspections by Date
    inspections.sort(function (a, b) {
      return new Date(b.inspectionDate) - new Date(a.inspectionDate);
    });

    let inspectionsRows = this.getInspectionRows(inspectionsLoading, inspections);
    return (
        <Modal show={this.state.showModal} onHide={this.hideModal} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>{business.businessName}{(business.businessProgramIdentifier) ? ', ' + business.businessProgramIdentifier : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <div className="call-out-text call-out-text-primary m-t-0">
                  <div className="row">
                    <div className="col-xs-6">
                      <p>{StringHelper.capitalCase(business.businessAddress)} <br />
                        {StringHelper.capitalCase(business.businessCity)}, WA {business.businessLocationZip}</p>
                      <p className={(business.businessPhone) ? 'show' : 'hidden'}><span
                        className="fa fa-phone" /> {StringHelper.phoneNumFormat(business.businessPhone)}</p>
                    </div>
                    <div className="col-xs-6 text-center">
                      <p><img style={style} className="img-rounded" alt={rating.string} src={require('../assets/img/' + rating.img + '_70.gif')} /></p>
                      <p>{rating.string}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="call-out-text call-out-text-default m-t-0">
                  <p><span className="fa fa-color-danger fa-exclamation-circle" /> Critical violation</p>
                  <p><span className="fa fa-color-info fa-cog" /> Maintenance &amp; sanitation violation</p>
                  <p><a href="//www.kingcounty.gov/healthservices/health/ehs/foodsafety/inspections/system.aspx" target="_blank">Learn more about violations</a></p>
                </div>
              </div>
            </div>
            {inspectionsRows}
          </Modal.Body>
          <Modal.Footer>
             <button className="btn btn-primary" onClick={this.hideModal}>
             Close
           </button>
          </Modal.Footer>
        </Modal>
    )
  }
}

DetailsPage.propTypes = {
  params: PropTypes.object.isRequired,
  history: PropTypes.object
};

DetailsPage.contextTypes = {
  router: PropTypes.object.isRequired
};
export default DetailsPage;

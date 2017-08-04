import React from 'react';
import PropTypes from 'prop-types';
// import {browserHistory} from 'react-router';
import { getBusinessApi, getInspectionsApi } from '../api/api';
import StringHelper from '../utils/StringHelper';
import Ratings from '../utils/Ratings';
import { Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import DetailsInspectionRow from './DetailsInspectionRow';

class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // State for Component
    this.state = {
      // isOpen: true,
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
      const popoverInspectionType = (
        <Popover>
         <p>Only routine inspections are used to calculate the inspection rating. Consultation/education is done following an unsatisfactory score.</p>
        </Popover>
      );
      const popoverViolations = (
        <Popover>
         <p><span className="fa fa-color-danger fa-exclamation-circle" /> High risk violations are for food safety requirements that prevent you from getting sick.</p>
         <p><span className="fa fa-color-info fa-cog" /> Low risk violations are not likely to cause illness.</p>
        </Popover>
      );
      const popoverResults = (
        <Popover>
         <p>Zero is a perfect score. Lower scores are better.</p>
         <p>Score over 90 would be a cause for closure.</p>
         <p><a href="#">More details about scoring.</a></p>
        </Popover>
      );
      return (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="bg-primary">
              <tr>
                <th>Date</th>
                <th>Inspection type&nbsp;
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverInspectionType}>
                    <span className="fa fa-question-circle" />
                  </OverlayTrigger>
                  &nbsp;/Violation list&nbsp; 
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverViolations}>
                    <span className="fa fa-question-circle" />
                  </OverlayTrigger>
                </th>
                <th>
                  Score&nbsp;
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverResults}>
                    <span className="fa fa-question-circle" />
                  </OverlayTrigger>
                  </th>
              </tr>
            </thead>
            {detailsInspectionRows}
          </table>
        </div>);
    }
  }

  render() {
    const { business, inspections, loading, errorLoading, inspectionsLoading } = this.state;
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
            <div className="col-sm-4 col-xs-6">
              <p><strong>{StringHelper.capitalCase(business.businessName)}</strong> <br />
              {StringHelper.capitalCase(business.businessAddress)} <br />
              {StringHelper.capitalCase(business.businessCity)}, WA {business.businessLocationZip}<br />
              <span className={(business.businessPhone) ? 'show' : 'hidden'}><span
              className="fa fa-phone" /> {StringHelper.phoneNumFormat(business.businessPhone)}</span></p>
              <p>{business.businessEstablishmentDescr} <a href="#"><span className="fa fa-question-circle" /></a></p>
              <p><a target="_blank" href={"//www.google.com/maps/dir//"+ StringHelper.capitalCase(business.businessAddress) + "+" + StringHelper.capitalCase(business.businessCity) + "+" + business.businessLocationZip}>Get directions <span className="fa fa-car"/></a></p>
            </div>
            <div className="col-sm-4 col-xs-6">
              <p className="text-center"><img alt={rating.string} src={require('../assets/img/dial_' + rating.img + '.jpg')} /> <br />
              <strong>{rating.string}</strong>
              </p>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="call-out-text call-out-text-default m-t-0">
                <p>The rating is based on the average of <span className="fa fa-color-danger fa-exclamation-circle" /> high risk violations from the last 4 routine inspections.</p>
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

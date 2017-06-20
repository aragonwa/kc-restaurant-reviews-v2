import React from 'react';
import PropTypes from 'prop-types';
import DetailsViolationRow from './DetailsViolationRow';

class DetailsInspectionRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  getViolationRows(inspection, inspectionIndex, opts) {
    //TODO: create a better key and indexId
    if (inspection.violations.length > 0 && inspection.violations[0]) {
      opts.dataToggle = 'collapse';
      opts.dataTarget = '.' + inspectionIndex;
      opts.showIcon = 'show';
      //TODO: make sure the fix worked (see below)
      // Remove this to Fix bug with render, but need to figure out how to activate the plus/minus sign
      const violations = inspection.violations.map((item) => {
          return (
            <DetailsViolationRow violation={item} index={inspectionIndex} key={item.violationRecordId} />
          );
        })
        // TODO: Document this change
      return (
        violations.sort((a,b)=>{
          if(a.props.violation.violationType.toLowerCase() === 'red' ) {
            return -1
          }
          else {
            return 1;
          }
        })
      )
    }
  }

  getInspectionType(inspectionType) {
    let typeStr = null;
    switch (Number(inspectionType)) {
      case 128:
        typeStr = "Routine Inspection"; //remove field review
        break;
      case 129:
        typeStr = "Return Inspection"; // Keep as is
        break;
      case 136:
        typeStr = "Consultation/Education"; //remove field
        break;
    }
    return typeStr;
  }

  render() {
    const { inspection, formatDate, inspectionIndex } = this.props;

    let opts = {
      dataToggle: null,
      dataTarget: null,
      showIcon: 'hidden',
      clickHandler: null
    };
    const violationRows = this.getViolationRows(inspection, inspectionIndex, opts);

    let inspectionRows = [(
      <tr data-toggle={opts.dataToggle} data-target={opts.dataTarget} onClick={this.clickHandler} key={inspection.inspectionSerialNum}>
        <td>{this.getInspectionType(inspection.inspectionType)}</td>
        <td>{formatDate(inspection.inspectionDate)}</td>
        <td><strong>{inspection.inspectionScore}</strong><span className={"pull-right " + opts.showIcon}><span className={(!this.state.isOpen) ? 'fa fa-plus' : 'fa fa-minus'} /></span></td>
      </tr>
    )];

    inspectionRows.push(violationRows);

    return (
      <tbody>
        {inspectionRows}
      </tbody>
    );
  }
}

DetailsInspectionRow.propTypes = {
  inspection: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  inspectionIndex: PropTypes.number.isRequired
  // activeViolations: PropTypes.array
  // inspectionRowOnClick: PropTypes.func.isRequired
};

export default DetailsInspectionRow;

import React from 'react';
import PropTypes from 'prop-types';

const DetailsInspectionRow = ({violation, index}) => {
  //http://stackoverflow.com/questions/4374822/javascript-regexp-remove-all-special-characters
  const {violationType} = violation;
  let violationIcon = null;
  let violationStr = violation.violationDescr.replace(/[^\w\s]/gi, '');
  //TODO: add accessiblity language
  if(violationType.toLowerCase() === 'red'){
    violationIcon = 'fa-color-danger fa-exclamation-circle';
    violationStr = (<strong>{violationStr}</strong>);
  } else if(violationType.toLowerCase() === 'blue'){
    violationIcon = 'fa-color-info fa-cog';
  }
  
  return (
    <tr className={"collapse " + index} key={index}>
      <td colSpan="1">&nbsp;</td>
      <td colSpan="1" className="p-l-lg"><span className={'fa ' + violationIcon} aria-hidden="true"/> {violationStr}</td>
      <td colSpan="1">{violation.violationPoints}</td>
    </tr>
  );
};

DetailsInspectionRow.propTypes = {
  violation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default DetailsInspectionRow;

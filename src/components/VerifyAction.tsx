import React from 'react';
import '../css/VerifyAction.css';

function VerifyAction(props:any):any {
  const { trigger } = props;
  const { children } = props;
  if (trigger) {
    return (
      <div className="popup">
        <div className="inner-popup">
          { children }
        </div>
      </div>
    );
  }
  return '';
}

export default VerifyAction;
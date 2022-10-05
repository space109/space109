import React from 'react';
import ReactDOM from 'react-dom';
import ControlBackdrop from './ControlBackdrop';
import ControlOverlay from './ControlOverlay';

const ControlModal = (props) => {
  return (
    <>
      <>
        {ReactDOM.createPortal(
          <ControlOverlay
            controlInfo={props.controlInfo}
            toggleControlInfo={props.toggleControlInfo}
          />,
          document.getElementById("control-overlay-root")
        )}
        {ReactDOM.createPortal(
          <ControlBackdrop
            controlInfo={props.controlInfo}
            toggleControlInfo={props.toggleControlInfo}
          />,
          document.getElementById("control-backdrop-root")
        )}
      </>
    </>
  );
};

export default ControlModal;
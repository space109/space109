import React from 'react';
import ReactDOM from 'react-dom';
import CommunityBackdrop from './CommunityBackdrop';
import CommunityOverlay from './CommunityOverlay';

const CommunityModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <CommunityOverlay
          open={props.open}
          toggleOpen={props.toggleOpen}
          post={props.post}
          addCommentHandler={props.addCommentHandler}
          resetCommentHandler={props.resetCommentHandler}
          disabled={props.disabled}
        />,
        document.getElementById("community-overlay-root")
      )}
      {ReactDOM.createPortal(
        <CommunityBackdrop open={props.open} toggleOpen={props.toggleOpen} />,
        document.getElementById("community-backdrop-root")
      )}
    </>
  );
};

export default CommunityModal;
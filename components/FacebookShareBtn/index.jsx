import React from 'react';
import PropTypes from 'prop-types';

const FacebookShareBtn = ({ url }) => (
  <div
    className="fb-share-button"
    data-href={url}
    data-layout="button"
    data-size="large"
    data-mobile-iframe="true"
  />
);

FacebookShareBtn.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FacebookShareBtn;

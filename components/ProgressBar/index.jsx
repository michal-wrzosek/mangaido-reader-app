import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './index.scss';

const ProgressBar = ({ progress }) => (
  <div className={styles.ProgressBar}>
    <div
      className={styles.ProgressBar__bar}
      style={{ width: `${progress}%` }}
    />
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;

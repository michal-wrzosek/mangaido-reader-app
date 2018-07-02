import React from 'react';
import PropTypes from 'prop-types';
import * as s from './index.scss';
import { Icon } from '../Icons';
import I18n from '../I18n';

const PageBackBtn = ({
  i18n,
  handleClick,
}) => (
  <div className={s.PageBackBtn}>
    <div
      className={s.PageBackBtn__btn}
      onClick={handleClick}
    >
      <Icon name="arrowLeft" />
      {' '}
      <I18n i18n={i18n} t="page_back_btn" />
    </div>
  </div>
);

PageBackBtn.propTypes = {
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PageBackBtn;

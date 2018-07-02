import React from 'react';
import PropTypes from 'prop-types';

const i18nt = (i18n, t, variable = '') => {
  let translation = typeof i18n[t] !== 'undefined' ? i18n[t] : t;
  translation = translation.replace('__VARIABLE__', variable);

  return translation;
};

const I18n = ({
  i18n,
  t,
  variable,
}) => (<span>{i18nt(i18n, t, variable)}</span>);

I18n.propTypes = {
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  t: PropTypes.string.isRequired,
  variable: PropTypes.string,
};

I18n.defaultProps = {
  variable: '',
};

export { i18nt };
export default I18n;

import React from 'react';
import PropTypes from 'prop-types';
import * as s from './RelatedSeries.scss';
import I18n, { i18nt } from '../I18n';

const RelatedSeries = ({
  series,
  i18n,
}) => (
  <div className={s.RelatedSeries}>
    {series.cover.ver800x400.length > 0 &&
      <div className={s.RelatedSeries__cover}>
        <img
          src={series.cover.ver800x400}
          className={s.RelatedSeries__cover__img}
          alt={i18nt(i18n, 'ending_page_related_series_cover_text')}
        />
      </div>
    }
    <div className={s.RelatedSeries__content}>
      <div className={s.RelatedSeries__title}>
        {series.title}
      </div>
      <a
        href={series.url}
        className={s.RelatedSeries__btn}
      >
        <I18n i18n={i18n} t="ending_page_related_series_show_btn" />
      </a>
    </div>
  </div>
);

RelatedSeries.propTypes = {
  series: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    languageName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isForAdults: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      ver1600x800: PropTypes.string.isRequired,
      ver800x400: PropTypes.string.isRequired,
      ver400x200: PropTypes.string.isRequired,
    }).isRequired,
    wideCover: PropTypes.shape({
      ver1920x320: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RelatedSeries;

import React from 'react';
import PropTypes from 'prop-types';
import * as s from './NextChapter.scss';
import { Icon } from '../Icons';
import I18n, { i18nt } from '../I18n';

const NextChapter = ({
  nextChapter,
  nextTranslation,
  i18n,
}) => (
  <div className={s.NextChapter}>
    {nextChapter.cover.ver640x260.length > 0 &&
      <div className={s.NextChapter__cover}>
        <img
          src={nextChapter.cover.ver640x260}
          alt={i18nt(i18n, 'ending_page_next_chapter_cover_text')}
          className={s.NextChapter__cover__img}
        />
      </div>
    }
    <div className={s.NextChapter__content}>
      <div className={s.NextChapter__title}>
        {nextChapter.title}
      </div>
      <a
        href={nextTranslation.id !== -1 ? nextTranslation.url : nextChapter.url}
        className={s.NextChapter__btn}
      >
        <Icon name="arrowRight" />
        {' '}
        <I18n i18n={i18n} t="ending_page_next_chapter_btn" />
      </a>
    </div>
  </div>
);

NextChapter.propTypes = {
  nextChapter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['book', 'webcomic']).isRequired,
    readingDirection: PropTypes.oneOf(['rtl', 'ltr']).isRequired,
    isFirstPageACover: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      ver640x260: PropTypes.string.isRequired,
      ver320x130: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    updatedAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    amountOfCoins: PropTypes.number.isRequired,
    canRead: PropTypes.bool.isRequired,
  }).isRequired,
  nextTranslation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    languageName: PropTypes.string.isRequired,
    viewCount: PropTypes.number.isRequired,
    isPublished: PropTypes.bool.isRequired,
    createdAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    updatedAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NextChapter;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './index.scss';
import PageBackBtn from '../PageBackBtn';
import I18n from '../I18n';

const InfoPage = ({
  users,
  series,
  chapter,
  isTranslation,
  translation,
  i18n,
  handlePageBackBtnClick,
}) => (
  <div className={styles.InfoPage}>
    <div className={styles.InfoPage__wrapper}>
      <PageBackBtn
        i18n={i18n}
        handleClick={handlePageBackBtnClick}
      />

      {/* SERIES COVER */}
      <img
        src={series.cover.ver800x400}
        className={styles.InfoPage__seriesCover}
        width={800}
        height={400}
        alt={''}
      />

      {/* SERIES WIDE COVER */}
      <img
        src={series.wideCover.ver1920x320}
        className={styles.InfoPage__seriesWideCover}
        width={1920}
        height={320}
        alt={''}
      />

      {/* SERIES TITLE */}
      <div
        className={classNames(
          styles.InfoPage__row,
          styles.InfoPage__row_seriesTitle,
        )}
      >
        <div className={styles.InfoPage__row__label}>
          <I18n i18n={i18n} t="info_page_series_label" />
        </div>
        <a
          href={series.url}
          className={styles.InfoPage__row__value}
        >
          {series.title}
        </a>
      </div>

      {/* CHAPTER TITLE */}
      <div
        className={classNames(
          styles.InfoPage__row,
          styles.InfoPage__row_chapterTitle,
        )}
      >
        <div className={styles.InfoPage__row__label}>
          <I18n i18n={i18n} t="info_page_chapter_label" />
        </div>
        <div className={styles.InfoPage__row__value}>
          {chapter.title}
        </div>
      </div>

      {/* ORIGINAL LANGUAGE */}
      <div
        className={classNames(
          styles.InfoPage__row,
          styles.InfoPage__row_originalLanguage,
        )}
      >
        <div className={styles.InfoPage__row__label}>
          <I18n i18n={i18n} t="info_page_original_language_label" />
        </div>
        <div className={styles.InfoPage__row__value}>
          {series.languageName}
        </div>
      </div>

      {/* AUTHOR */}
      <div
        className={classNames(
          styles.InfoPage__row,
          styles.InfoPage__row_author,
        )}
      >
        <div className={styles.InfoPage__row__label}>
          <I18n i18n={i18n} t="info_page_author_label" />
        </div>
        <a
          href={users.author.url}
          className={styles.InfoPage__row__value}
        >
          {users.author.name}
        </a>
      </div>

      {/* TRANSLATOR */}
      {isTranslation &&
        <div
          className={classNames(
            styles.InfoPage__row,
            styles.InfoPage__row_translator,
          )}
        >
          <div className={styles.InfoPage__row__label}>
            <I18n i18n={i18n} t="info_page_translator_label" />
          </div>
          <a
            href={users.translator.url}
            className={styles.InfoPage__row__value}
          >
            {users.translator.name}
          </a>
        </div>
      }

      {/* TRANSLATION LANGUAGE */}
      {isTranslation &&
        <div
          className={classNames(
            styles.InfoPage__row,
            styles.InfoPage__row_translationLanguage,
          )}
        >
          <div className={styles.InfoPage__row__label}>
            <I18n i18n={i18n} t="info_page_translation_language_label" />
          </div>
          <div className={styles.InfoPage__row__value}>
            {translation.languageName}
          </div>
        </div>
      }

      {/* DESCRIPTION */}
      <div
        className={classNames(
          styles.InfoPage__row,
          styles.InfoPage__row_description,
        )}
      >
        <div className={styles.InfoPage__row__label}>
          <I18n i18n={i18n} t="info_page_description_label" />
        </div>
        <div className={styles.InfoPage__row__value}>
          {series.description}
        </div>
      </div>

      {/* IS FOR ADULTS */}
      <div
        className={classNames(
          styles.InfoPage__row,
          styles.InfoPage__row_isForAdults,
        )}
      >
        <div className={styles.InfoPage__row__label}>
          <I18n i18n={i18n} t="info_page_is_for_adults_label" />
        </div>
        <div className={styles.InfoPage__row__value}>
          {series.isForAdults ?
            <I18n i18n={i18n} t="info_page_is_for_adults_yes" />
            :
            <I18n i18n={i18n} t="info_page_is_for_adults_no" />
          }
        </div>
      </div>
    </div>
  </div>
);

InfoPage.propTypes = {
  users: PropTypes.shape({
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      uname: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.shape({
        ver100x100: PropTypes.string.isRequired,
        ver200x200: PropTypes.string.isRequired,
        ver400x400: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      uname: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.shape({
        ver100x100: PropTypes.string.isRequired,
        ver200x200: PropTypes.string.isRequired,
        ver400x400: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    translator: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      uname: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.shape({
        ver100x100: PropTypes.string.isRequired,
        ver200x200: PropTypes.string.isRequired,
        ver400x400: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
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
  chapter: PropTypes.shape({
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
      ago: PropTypes.string.isRequired,
    }).isRequired,
    updatedAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    amountOfCoins: PropTypes.number.isRequired,
    canRead: PropTypes.bool.isRequired,
  }).isRequired,
  isTranslation: PropTypes.bool.isRequired,
  translation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    languageName: PropTypes.string.isRequired,
    viewCount: PropTypes.number.isRequired,
    isPublished: PropTypes.bool.isRequired,
    createdAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    updatedAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  handlePageBackBtnClick: PropTypes.func.isRequired,
};

export default InfoPage;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as s from './index.scss';
import { Icon } from '../Icons';
import TranslationForm from './TranslationForm';
import PageBackBtn from '../PageBackBtn';
import I18n from '../I18n';

const TranslationsPage = ({
  chapterUrl,
  isTranslationsFormLoading,
  currentUserId,
  currentTranslationId,
  translationBalloons,
  translations,
  languages,
  i18n,
  handleTranslationFormSubmit,
  handlePageBackBtnClick,
}) => {
  const getAllWords = balloons => Object
    .keys(balloons)
    .reduce(
      (allTranslationTextsSum, chapterId) => {
        const chTranslationTexts = balloons[chapterId]
          .reduce(
            (chTranslationTextsSum, chTranslationBalloon) =>
              `${chTranslationTextsSum} ${chTranslationBalloon.text}`,
            '',
          );
        return `${allTranslationTextsSum} ${chTranslationTexts}`;
      },
      '',
    );

  const getCharacterCount = balloons => getAllWords(balloons)
    .trim()
    .split(/\s+/)
    .join('')
    .length;

  const getWordCount = balloons => getAllWords(balloons)
    .trim()
    .split(/\s+/)
    .length;

  return (
    <div className={s.TranslationsPage}>
      <div className={s.TranslationsPage__wrapper}>
        <PageBackBtn
          i18n={i18n}
          handleClick={handlePageBackBtnClick}
        />
        {currentUserId !== -1 &&
          <div className={s.TranslationsPage__form}>
            <TranslationForm
              isTranslationsFormLoading={isTranslationsFormLoading}
              languages={languages}
              i18n={i18n}
              handleTranslationFormSubmit={handleTranslationFormSubmit}
            />
          </div>
        }
        <div className={s.TranslationsPage__list}>
          {translations.map(translation =>
            <div
              key={translation.id}
              className={classNames({
                [s.TranslationsPage__listItem]: true,
                [s.TranslationsPage__listItem_active]:
                  translation.id === currentTranslationId,
              })}
            >
              <div className={s.TranslationsPage__translator}>
                <div className={s.TranslationsPage__translator__avatar}>
                  <img
                    src={translation.user.avatarUrl.ver200x200}
                    className={s.TranslationsPage__translator__avatar__img}
                    alt={''}
                  />
                </div>
                <div className={s.TranslationsPage__translator__name}>
                  {translation.user.name}
                </div>
                <div className={s.TranslationsPage__translator__uname}>
                  @{translation.user.uname}
                </div>
              </div>
              <div className={s.TranslationsPage__translation}>
                <div className={s.TranslationsPage__translation__language}>
                  {translation.languageName}
                </div>
                <div className={s.TranslationsPage__translation__createdAt}>
                  <I18n
                    i18n={i18n}
                    t="translations_page_created_ago"
                    variable={translation.createdAt.ago}
                  />
                </div>
                <div className={s.TranslationsPage__translation__updatedAt}>
                  <I18n
                    i18n={i18n}
                    t="translations_page_updated_ago"
                    variable={translation.updatedAt.ago}
                  />
                </div>
                <div className={s.TranslationsPage__translation__viewCount}>
                  <Icon name={'eye'} /> {translation.viewCount}
                </div>
                {translation.id === currentTranslationId &&
                  <div className={s.TranslationsPage__translation__wordCount}>
                    <I18n
                      i18n={i18n}
                      t="translations_page_nr_of_words"
                      variable={`${getWordCount(translationBalloons)}`}
                    />
                  </div>
                }
                {translation.id === currentTranslationId &&
                  <div className={s.TranslationsPage__translation__characterCount}>
                    <I18n
                      i18n={i18n}
                      t="translations_page_nr_of_characters"
                      variable={`${getCharacterCount(translationBalloons)}`}
                    />
                  </div>
                }
                <div className={s.TranslationsPage__translation__actions}>
                  {translation.id !== currentTranslationId &&
                    <a
                      className={s.TranslationsPage__translation__showBtn}
                      href={translation.url}
                    >
                      <I18n i18n={i18n} t="translations_page_show_btn" />
                    </a>
                  }
                  {translation.id === currentTranslationId &&
                    <a
                      className={s.TranslationsPage__translation__closeBtn}
                      href={chapterUrl}
                    >
                      <I18n i18n={i18n} t="translations_page_close_btn" />
                    </a>
                  }
                  {translation.user.id === currentUserId &&
                    <a
                      className={s.TranslationsPage__translation__editBtn}
                      href={`${translation.url}/edit`}
                    >
                      <I18n i18n={i18n} t="translations_page_edit_btn" />
                    </a>
                  }
                </div>
              </div>
            </div>,
          )}
        </div>
      </div>
    </div>
  );
};

TranslationsPage.propTypes = {
  chapterUrl: PropTypes.string.isRequired,
  isTranslationsFormLoading: PropTypes.bool.isRequired,
  currentUserId: PropTypes.number.isRequired,
  currentTranslationId: PropTypes.number.isRequired,
  translationBalloons: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        chapterImageId: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired,
        posX: PropTypes.number.isRequired,
        posY: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  translations: PropTypes.arrayOf(
    PropTypes.shape({
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
      user: PropTypes.shape({
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
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  handleTranslationFormSubmit: PropTypes.func.isRequired,
  handlePageBackBtnClick: PropTypes.func.isRequired,
};

export default TranslationsPage;

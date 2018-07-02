import React from 'react';
import PropTypes from 'prop-types';
import * as s from './Donate.scss';
import I18n from '../I18n';

const donateUrl = ({ baseUrl, userId }) =>
  `${baseUrl}/transactions/new?product_id=${userId}&product_type=User`;

const Donate = ({
  author,
  translator,
  baseUrl,
  i18n,
}) => (
  <div className={s.Donate}>
    <a
      href={donateUrl({ baseUrl, userId: author.id })}
      className={s.Donate__btn}
    >
      <img
        className={s.Donate__btn__avatar}
        alt="Author's avatar"
        src={author.avatarUrl.ver200x200}
      />
      <div className={s.Donate__btn__text}>
        <I18n i18n={i18n} t="ending_page_donate_author_btn" />
      </div>
      <div className={s.Donate__btn__user}>
        @{author.uname}
      </div>
    </a>
    {translator.id !== -1 &&
      <a
        href={donateUrl({ baseUrl, userId: translator.id })}
        className={s.Donate__btn}
      >
        <img
          className={s.Donate__btn__avatar}
          alt="Translator's avatar"
          src={translator.avatarUrl.ver200x200}
        />
        <div className={s.Donate__btn__text}>
          <I18n i18n={i18n} t="ending_page_donate_translator_btn" />
        </div>
        <div className={s.Donate__btn__user}>
          @{translator.uname}
        </div>
      </a>
    }
  </div>
);

Donate.propTypes = {
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
  baseUrl: PropTypes.string.isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Donate;

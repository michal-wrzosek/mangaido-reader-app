import React from 'react';
import PropTypes from 'prop-types';
import * as s from './index.scss';
import Comments from './Comments';
import PageBackBtn from '../PageBackBtn';
import FacebookShareBtn from '../FacebookShareBtn';

const SocialPage = ({
  chapterUrl,
  translationUrl,
  areCommentsLoading,
  baseUrl,
  currentUser,
  comments,
  i18n,
  handleCommentsFormSubmit,
  handleCommentRemoveClick,
  handlePageBackBtnClick,
}) => (
  <div className={s.SocialPage}>
    <div className={s.SocialPage__wrapper}>
      <PageBackBtn
        i18n={i18n}
        handleClick={handlePageBackBtnClick}
      />
      <div className={s.SocialPage__socialBtns}>
        <FacebookShareBtn
          url={translationUrl.length ? translationUrl : chapterUrl}
        />
      </div>
      <div className={s.SocialPage__comments}>
        <Comments
          areCommentsLoading={areCommentsLoading}
          baseUrl={baseUrl}
          currentUser={currentUser}
          comments={comments}
          i18n={i18n}
          handleCommentsFormSubmit={handleCommentsFormSubmit}
          handleCommentRemoveClick={handleCommentRemoveClick}
        />
      </div>
    </div>
  </div>
);

SocialPage.propTypes = {
  chapterUrl: PropTypes.string.isRequired,
  translationUrl: PropTypes.string.isRequired,
  areCommentsLoading: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
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
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
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
    createdAt: PropTypes.shape({
      time: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      ago: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  handleCommentsFormSubmit: PropTypes.func.isRequired,
  handleCommentRemoveClick: PropTypes.func.isRequired,
  handlePageBackBtnClick: PropTypes.func.isRequired,
};

export default SocialPage;

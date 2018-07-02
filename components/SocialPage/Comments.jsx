import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';
import {
  Form,
  TextArea,
} from 'react-form';
import * as s from './Comments.scss';
import { Icon } from '../Icons';
import FormLoader from '../FormLoader';
import I18n, { i18nt } from '../I18n';

const parseContent = ({
  content,
  baseUrl,
}) => {
  let newContentText = reactStringReplace(
    content,
    /(https?:\/\/\S+)/g,
    (match, i) => (
      <a
        key={match + i}
        href={match}
        target="_blank"
        rel="noopener noreferrer"
      >
        {match}
      </a>
    ),
  );

  newContentText = reactStringReplace(
    newContentText,
    /@(\w+)/g,
    (match, i) => (
      <a
        key={match + i}
        href={`${baseUrl}/u/${match}`}
        className={s.Comment__content__userLink}
      >
        @{match}
      </a>
    ),
  );

  return newContentText;
};

const Comments = ({
  areCommentsLoading,
  baseUrl,
  currentUser,
  comments,
  i18n,
  handleCommentsFormSubmit,
  handleCommentRemoveClick,
}) => (
  <div className={s.Comments}>
    <div className={s.Comments__list}>
      {comments.map(comment => (
        <div
          key={comment.id}
          className={s.Comment}
        >
          {/* AVATAR */}
          <div className={s.Comment__avatar}>
            <img
              className={s.Comment__avatar__img}
              src={comment.user.avatarUrl.ver200x200}
              alt={i18nt(i18n, 'comments_avatar_image_text')}
            />
          </div>
          <div className={s.Comment__textWrapper}>
            <div className={s.Comment__topText}>

              <div className={s.Comment__nameAndContent}>
                {/* AUTHOR NAME */}
                <a
                  className={s.Comment__authorName}
                  href={comment.user.url}
                >
                  {comment.user.name}
                </a>

                {/* CONTENT */}
                <span className={s.Comment__content}>
                  {parseContent({
                    content: comment.content,
                    baseUrl,
                  })}
                </span>
              </div>

              {/* REMOVE BTN */}
              {comment.user.id === currentUser.id &&
                <span
                  className={s.Comment__removeBtn}
                  onClick={() => handleCommentRemoveClick(comment.id)}
                >
                  <Icon name="trashBin" />
                </span>
              }
            </div>
            <div className={s.Comment__bottomText}>

              {/* AUTHOR UNAME */}
              <span className={s.Comment__authorUname}>
                {`@${comment.user.uname}`}
              </span>

              {/* TIME AGO */}
              <span className={s.Comment__timeAgo}>
                <I18n
                  i18n={i18n}
                  t="comments_time_ago"
                  variable={comment.createdAt.ago}
                />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
    {currentUser.id !== -1 &&
      <Form onSubmit={values => handleCommentsFormSubmit(values.content)}>
        {formApi =>
          <form
            onSubmit={formApi.submitForm}
            className={s.Comments__form}
          >
            <div className={s.Comments__form__textarea}>
              <div className={s.Comments__form__textarea__avatar}>
                <img
                  className={s.Comments__form__textarea__avatar__img}
                  src={currentUser.avatarUrl.ver200x200}
                  alt={i18nt(i18n, 'comments_avatar_image_text')}
                />
              </div>
              <TextArea
                field="content"
                className={s.Comments__form__textarea__field}
                placeholder={i18nt(i18n, 'comments_text_area_placeholder')}
              />
            </div>
            <div className={s.Comments__form__actions}>
              <button
                type="submit"
                className={s.Comments__form__actions__btn}
              >
                <I18n i18n={i18n} t="comments_sumbmit_btn" />
              </button>
            </div>
            {areCommentsLoading &&
              <FormLoader />
            }
          </form>
        }
      </Form>
    }
  </div>
);

Comments.propTypes = {
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
};

export default Comments;

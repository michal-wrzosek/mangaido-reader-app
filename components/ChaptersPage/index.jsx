import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './index.scss';
import { Icon } from '../Icons';
import PageBackBtn from '../PageBackBtn';
import I18n from '../I18n';

const ChaptersPage = ({
  currentChapterId,
  chapters,
  i18n,
  handlePageBackBtnClick,
}) => (
  <div className={styles.ChaptersPage}>
    <div className={styles.ChaptersPage__wrapper}>
      <PageBackBtn
        i18n={i18n}
        handleClick={handlePageBackBtnClick}
      />
      <div className={styles.ChaptersPage__chapters}>
        {chapters.map((chapter, index) =>
          <a
            key={chapter.id}
            href={chapter.url}
            className={classNames({
              [styles.ChaptersPage__chapter]: true,
              [styles.ChaptersPage__chapter_active]:
                chapter.id === currentChapterId,
              [styles.ChaptersPage__chapter_noAccess]: !chapter.canRead,
            })}
          >
            <img
              className={styles.ChaptersPage__chapter__cover}
              src={chapter.cover.ver640x260}
              width={640}
              height={260}
              alt={''}
            />
            <div className={styles.ChaptersPage__chapter__text}>
              <div className={styles.ChaptersPage__chapter__index}>
                <span className={styles.ChaptersPage__chapter__index__icon}>
                  <Icon name={'hashtag'} />
                </span>
                <span className={styles.ChaptersPage__chapter__index__nr}>
                  {index}
                </span>
              </div>
              <div className={styles.ChaptersPage__chapter__title}>
                {chapter.title}
              </div>
            </div>
            <div className={styles.ChaptersPage__chapter__text}>
              <div className={styles.ChaptersPage__chapter__coins}>
                <span className={styles.ChaptersPage__chapter__coins__icon}>
                  <Icon name={'coin'} />
                </span>
                <span className={styles.ChaptersPage__chapter__coins__nr}>
                  {chapter.amountOfCoins}
                </span>
              </div>
              <div className={styles.ChaptersPage__chapter__createdAt}>
                <I18n
                  i18n={i18n}
                  t="chapters_page_created_ago"
                  variable={chapter.createdAt.ago}
                />
              </div>
            </div>
          </a>,
        )}
      </div>
    </div>
  </div>
);

ChaptersPage.propTypes = {
  currentChapterId: PropTypes.number.isRequired,
  chapters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
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
  })).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  handlePageBackBtnClick: PropTypes.func.isRequired,
};

export default ChaptersPage;

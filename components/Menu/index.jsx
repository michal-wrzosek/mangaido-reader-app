import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '../Icons';
import * as styles from './index.scss';
import I18n from '../I18n';

class Menu extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    if (this.props.currentPage === page) {
      this.props.changePage('book');
    } else {
      this.props.changePage(page);
    }
  }

  render() {
    const {
      bookType,
      readingDirection,
      currentPage,
      isDesktop,
      i18n,
      isZoomed,
      nextThing,
    } = this.props;

    return (
      <div className={styles.Menu}>
        <div className={styles.Menu__wrapper}>
          <div className={styles.Menu__items}>

            {/* INFO */}
            <div
              className={classNames({
                [styles.Menu__item]: true,
                [styles.Menu__item_selected]: currentPage === 'info',
              })}
              onClick={() => this.handleClick('info')}
            >
              <div className={styles.Menu__item__icon}>
                <Icon name="info" />
              </div>
              <div className={styles.Menu__item__text}>
                <I18n i18n={i18n} t="menu_info_btn" />
              </div>
            </div>

            {/* CHAPTERS */}
            <div
              className={classNames({
                [styles.Menu__item]: true,
                [styles.Menu__item_selected]: currentPage === 'chapters',
              })}
              onClick={() => this.handleClick('chapters')}
            >
              <div className={styles.Menu__item__icon}>
                <Icon name="chapters" />
              </div>
              <div className={styles.Menu__item__text}>
                <I18n i18n={i18n} t="menu_chapters_btn" />
              </div>
            </div>

            {/* TRANSLATIONS */}
            <div
              className={classNames({
                [styles.Menu__item]: true,
                [styles.Menu__item_selected]: currentPage === 'translations',
              })}
              onClick={() => this.handleClick('translations')}
            >
              <div className={styles.Menu__item__icon}>
                <Icon name="translations" />
              </div>
              <div className={styles.Menu__item__text}>
                <I18n i18n={i18n} t="menu_translations_btn" />
              </div>
            </div>

            {/* SOCIAL */}
            <div
              className={classNames({
                [styles.Menu__item]: true,
                [styles.Menu__item_selected]: currentPage === 'social',
              })}
              onClick={() => this.handleClick('social')}
            >
              <div className={styles.Menu__item__icon}>
                <Icon name="comments" />
              </div>
              <div className={styles.Menu__item__text}>
                <I18n i18n={i18n} t="menu_social_btn" />
              </div>
            </div>

            {/* NEXT FOR MOBILE BOOK READER */}
            {bookType === 'book' && currentPage === 'book' && !isDesktop &&
              <div
                className={classNames({
                  [styles.Menu__item]: true,
                  [styles.Menu__item_disabled]: isZoomed,
                })}
                onClick={() => { if (!isZoomed) nextThing(); }}
              >
                <div className={styles.Menu__item__icon}>
                  {readingDirection === 'ltr' &&
                    <Icon name="arrowRight" />
                  }
                  {readingDirection === 'rtl' &&
                    <Icon name="arrowLeft" />
                  }
                </div>
                <div className={styles.Menu__item__text}>
                  <I18n i18n={i18n} t="menu_next_btn" />
                </div>
              </div>
            }

            {/* READ FOR MOBILE BOOK READER */}
            {bookType === 'book' && currentPage !== 'book' && !isDesktop &&
              <div
                className={styles.Menu__item}
                onClick={() => this.handleClick('book')}
              >
                <div className={styles.Menu__item__icon}>
                  <Icon name="eye" />
                </div>
                <div className={styles.Menu__item__text}>
                  <I18n i18n={i18n} t="menu_read_btn" />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  bookType: PropTypes.oneOf(['webcomic', 'book']).isRequired,
  readingDirection: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
  currentPage: PropTypes.oneOf([
    'book',
    'info',
    'chapters',
    'translations',
    'social',
  ]).isRequired,
  isDesktop: PropTypes.bool.isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  isZoomed: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
  nextThing: PropTypes.func.isRequired,
};

export default Menu;

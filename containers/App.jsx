import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as styles from './App.scss';
import * as appActions from '../redux/actions/app';
import * as bookActions from '../redux/actions/book';
import * as translationActions from '../redux/actions/translation';
import * as commentsActions from '../redux/actions/comments';
import * as translationBalloonsActions from '../redux/actions/translationBalloons';
import {
  getTranslationBalloonsByChapterImagesId,
} from '../redux/selectors/translationBalloons';
import { getLanguagesSorted } from '../redux/selectors/languages';
import { getCommentsSorted } from '../redux/selectors/comments';
import Icons from '../components/Icons';
import Webcomic from '../components/Webcomic';
import MobileBook from '../components/MobileBook';
import InfoPage from '../components/InfoPage';
import ChaptersPage from '../components/ChaptersPage';
import TranslationsPage from '../components/TranslationsPage';
import SocialPage from '../components/SocialPage';
import Menu from '../components/Menu';
import DesktopBook from '../components/DesktopBook';

class App extends Component {

  constructor(props) {
    super(props);

    this.nextThing = this.nextThing.bind(this);
    this.getTooltipScreenText = this.getTooltipScreenText.bind(this);
  }

  componentWillMount() {
    this.props.getInitialData();
  }

  getTooltipScreenText() {
    const {
      translationBalloonsArray,
      translationBalloonOptions,
    } = this.props;

    const { currentBalloonId } = this.props.book;

    if (currentBalloonId === -1) {
      return '';
    }

    const options = translationBalloonOptions[currentBalloonId];

    if (typeof options === 'undefined') {
      return '';
    }

    if (options.side !== 'screen') {
      return '';
    }

    const currentBalloon = translationBalloonsArray.find(tb => tb.id === currentBalloonId);

    if (typeof currentBalloon === 'undefined') {
      return '';
    }

    return currentBalloon.text;
  }

  // next page, or balloon if any
  nextThing() {
    const {
      book,
      chapterImages,
      translationBalloons,
      nextPage,
      selectBalloon,
    } = this.props;

    const currentPage = chapterImages[book.currentPageIndex];

    // check if there are any balloons on page
    const currentBalloons = translationBalloons[currentPage.id];

    // if there are any balloons on this page
    if (currentBalloons.length) {
      const currentBalloonIndex = currentBalloons
        .findIndex(b => b.id === book.currentBalloonId);

      // if there is any balloon left on this page
      if ((currentBalloonIndex + 1) < currentBalloons.length) {
        selectBalloon(currentBalloons[currentBalloonIndex + 1].id);

      // there is no more balloons on this page
      } else {
        nextPage();
      }

    // there is no balloons on this page
    } else {
      nextPage();
    }
  }

  render() {
    const {
      app,
      book,
      users,
      series,
      chapter,
      nextChapter,
      nextTranslation,
      chapterImages,
      chapters,
      translation,
      changeAppPage,
      nextPage,
      previousPage,
      changePage,
      translationBalloons,
      translationBalloonOptions,
      translations,
      languages,
      comments,
      relatedSeries,
      i18n,
      selectBalloon,
      deselectBalloons,
      handleTranslationFormSubmit,
      handleCommentsFormSubmit,
      handleCommentRemoveClick,
      handlePageBackBtnClick,
      handleCloseBookEndingPageBtnClick,
      translationBalloonChangeSide,
      zoomIn,
      zoomOut,
    } = this.props;

    return (
      <div className={styles.App}>
        <Icons />
        {!app.isLoading &&
          <div className={styles.App__pages}>

            {/* BOOK / WEBCOMIC */}
            {true &&
              <div
                className={classNames(
                  styles.App__page,
                  styles.App__page_reader,
                )}
              >
                {book.bookType === 'book' &&
                  (app.windowWidth < 768 ?
                    <MobileBook
                      pages={chapterImages}
                      currentPageIndex={book.currentPageIndex}
                      lastPageIndex={book.lastPageIndex}
                      pageRatio={book.pageRatio}
                      currentBalloonId={book.currentBalloonId}
                      readingProgress={book.readingProgress}
                      readingDirection={chapter.readingDirection}
                      isFirstPageACover={chapter.isFirstPageACover}
                      backgroundColor={chapter.backgroundColor}
                      isEndingPageOpen={book.isEndingPageOpen}
                      author={users.author}
                      translator={users.translator}
                      baseUrl={app.baseUrl}
                      nextChapter={nextChapter}
                      nextTranslation={nextTranslation}
                      relatedSeries={relatedSeries}
                      nextPage={nextPage}
                      previousPage={previousPage}
                      translationBalloons={translationBalloons}
                      translationBalloonOptions={translationBalloonOptions}
                      tooltipScreenText={this.getTooltipScreenText()}
                      i18n={i18n}
                      isZoomed={book.isZoomed}
                      selectBalloon={selectBalloon}
                      deselectBalloons={deselectBalloons}
                      handleCloseBookEndingPageBtnClick={handleCloseBookEndingPageBtnClick}
                      translationBalloonChangeSide={translationBalloonChangeSide}
                      zoomIn={zoomIn}
                      zoomOut={zoomOut}
                    />
                    :
                    <DesktopBook
                      pages={chapterImages}
                      currentPageIndex={book.currentPageIndex}
                      readingDirection={chapter.readingDirection}
                      isFirstPageACover={chapter.isFirstPageACover}
                      backgroundColor={chapter.backgroundColor}
                      readingProgress={book.readingProgress}
                      translationBalloons={translationBalloons}
                      translationBalloonOptions={translationBalloonOptions}
                      tooltipScreenText={this.getTooltipScreenText()}
                      currentBalloonId={book.currentBalloonId}
                      isEndingPageOpen={book.isEndingPageOpen}
                      author={users.author}
                      translator={users.translator}
                      baseUrl={app.baseUrl}
                      nextChapter={nextChapter}
                      nextTranslation={nextTranslation}
                      relatedSeries={relatedSeries}
                      i18n={i18n}
                      selectBalloon={selectBalloon}
                      deselectBalloons={deselectBalloons}
                      changePage={changePage}
                      handleCloseBookEndingPageBtnClick={handleCloseBookEndingPageBtnClick}
                      translationBalloonChangeSide={translationBalloonChangeSide}
                    />
                  )
                }
                {book.bookType === 'webcomic' &&
                  <Webcomic
                    pages={chapterImages}
                    currentPageIndex={book.currentPageIndex}
                    currentBalloonId={book.currentBalloonId}
                    readingProgress={book.readingProgress}
                    backgroundColor={chapter.backgroundColor}
                    nextChapter={nextChapter}
                    nextTranslation={nextTranslation}
                    author={users.author}
                    translator={users.translator}
                    baseUrl={app.baseUrl}
                    relatedSeries={relatedSeries}
                    i18n={i18n}
                    changePage={changePage}
                    translationBalloons={translationBalloons}
                    translationBalloonOptions={translationBalloonOptions}
                    tooltipScreenText={this.getTooltipScreenText()}
                    isZoomed={book.isZoomed}
                    selectBalloon={selectBalloon}
                    deselectBalloons={deselectBalloons}
                    translationBalloonChangeSide={translationBalloonChangeSide}
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                  />
                }
              </div>
            }

            {/* INFO */}
            {app.currentPage === 'info' &&
              <div
                className={classNames(
                  styles.App__page,
                  styles.App__page_info,
                )}
              >
                <InfoPage
                  users={users}
                  series={series}
                  chapter={chapter}
                  isTranslation={app.isTranslation}
                  translation={translation}
                  i18n={i18n}
                  handlePageBackBtnClick={handlePageBackBtnClick}
                />
              </div>
            }

            {/* CHAPTERS */}
            {app.currentPage === 'chapters' &&
              <div
                className={classNames(
                  styles.App__page,
                  styles.App__page_chapters,
                )}
              >
                <ChaptersPage
                  currentChapterId={chapter.id}
                  chapters={chapters}
                  i18n={i18n}
                  handlePageBackBtnClick={handlePageBackBtnClick}
                />
              </div>
            }

            {/* TRANSLATIONS */}
            {app.currentPage === 'translations' &&
              <div
                className={classNames(
                  styles.App__page,
                  styles.App__page_translations,
                )}
              >
                <TranslationsPage
                  chapterUrl={chapter.url}
                  isTranslationsFormLoading={app.isTranslationsFormLoading}
                  currentUserId={users.currentUser.id}
                  currentTranslationId={translation.id}
                  translationBalloons={translationBalloons}
                  translations={translations}
                  languages={languages}
                  i18n={i18n}
                  handleTranslationFormSubmit={handleTranslationFormSubmit}
                  handlePageBackBtnClick={handlePageBackBtnClick}
                />
              </div>
            }

            {/* SOCIAL */}
            {app.currentPage === 'social' &&
              <div
                className={classNames(
                  styles.App__page,
                  styles.App__page_more,
                )}
              >
                <SocialPage
                  chapterUrl={chapter.url}
                  translationUrl={translation.url}
                  areCommentsLoading={app.areCommentsLoading}
                  baseUrl={app.baseUrl}
                  currentUser={users.currentUser}
                  comments={comments}
                  i18n={i18n}
                  handleCommentsFormSubmit={handleCommentsFormSubmit}
                  handleCommentRemoveClick={handleCommentRemoveClick}
                  handlePageBackBtnClick={handlePageBackBtnClick}
                />
              </div>
            }
          </div>
        }
        <div className={styles.App__menu}>
          <Menu
            bookType={book.bookType}
            readingDirection={chapter.readingDirection}
            currentPage={app.currentPage}
            isDesktop={app.windowWidth >= 768}
            i18n={i18n}
            isZoomed={book.isZoomed}
            changePage={changeAppPage}
            nextThing={this.nextThing}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    currentPage: PropTypes.oneOf([
      'book',
      'info',
      'chapters',
      'translations',
      'social',
    ]).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isReceivedInitialData: PropTypes.bool.isRequired,
    isTranslation: PropTypes.bool.isRequired,
    apiUrl: PropTypes.string.isRequired,
    baseUrl: PropTypes.string.isRequired,
    areCommentsLoading: PropTypes.bool.isRequired,
    isTranslationsFormLoading: PropTypes.bool.isRequired,
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
  }).isRequired,
  book: PropTypes.shape({
    currentPageIndex: PropTypes.number.isRequired,
    lastPageIndex: PropTypes.number.isRequired,
    nrOfPages: PropTypes.number.isRequired,
    pageRatio: PropTypes.number.isRequired,
    currentBalloonId: PropTypes.number.isRequired,
    readingProgress: PropTypes.number.isRequired,
    bookType: PropTypes.oneOf([
      'webcomic',
      'book',
    ]).isRequired,
    isEndingPageOpen: PropTypes.bool.isRequired,
    isZoomed: PropTypes.bool.isRequired,
  }).isRequired,
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
  chapterImages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  })).isRequired,
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
  })).isRequired,
  translation: PropTypes.shape({
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
  translationBalloons: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    chapterImageId: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }))).isRequired,
  translationBalloonsArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    chapterImageId: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  translationBalloonOptions: PropTypes.objectOf(PropTypes.shape({
    side: PropTypes.oneOf(['screen', 'up', 'right', 'down', 'left']).isRequired,
  })).isRequired,
  translations: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
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
  relatedSeries: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  getInitialData: PropTypes.func.isRequired,
  changeAppPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  handleTranslationFormSubmit: PropTypes.func.isRequired,
  handleCommentsFormSubmit: PropTypes.func.isRequired,
  handleCommentRemoveClick: PropTypes.func.isRequired,
  handlePageBackBtnClick: PropTypes.func.isRequired,
  handleCloseBookEndingPageBtnClick: PropTypes.func.isRequired,
  translationBalloonChangeSide: PropTypes.func.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
  book: state.book,
  users: state.users,
  series: state.series,
  chapter: state.chapter,
  nextChapter: state.nextChapter,
  nextTranslation: state.nextTranslation,
  chapterImages: state.chapterImages,
  chapters: state.chapters,
  translation: state.translation,
  translationBalloons: getTranslationBalloonsByChapterImagesId(state),
  translationBalloonsArray: state.translationBalloons,
  translationBalloonOptions: state.translationBalloonOptions,
  translations: state.translations,
  languages: getLanguagesSorted(state),
  comments: getCommentsSorted(state),
  relatedSeries: state.relatedSeries,
  i18n: state.i18n,
});

const mapDispatchToProps = dispatch => ({
  getInitialData: () => dispatch(appActions.getInitialData()),
  changeAppPage: page => dispatch(appActions.changePage(page)),
  nextPage: () => dispatch(bookActions.nextPage()),
  previousPage: () => dispatch(bookActions.previousPage()),
  changePage: pageIndex => dispatch(bookActions.changePage(pageIndex)),
  selectBalloon: balloonId => dispatch(bookActions.selectBalloon(balloonId)),
  deselectBalloons: () => dispatch(bookActions.deselectBalloons()),
  handleTranslationFormSubmit: language => dispatch(translationActions.create(language)),
  handleCommentsFormSubmit: content => dispatch(commentsActions.create(content)),
  handleCommentRemoveClick: commentId => dispatch(commentsActions.remove(commentId)),
  handlePageBackBtnClick: () => dispatch(appActions.changePage('book')),
  handleCloseBookEndingPageBtnClick: () => dispatch(bookActions.closeEndingPage()),
  translationBalloonChangeSide: (translationBalloonId, side) => dispatch(
    translationBalloonsActions.changeSide(translationBalloonId, side),
  ),
  zoomIn: () => dispatch(bookActions.zoomIn()),
  zoomOut: () => dispatch(bookActions.zoomOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

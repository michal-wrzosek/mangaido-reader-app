import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as s from './index.scss';
import ProgressBar from '../ProgressBar';
import TranslationBalloon from '../TranslationBalloon';
import EndingPage from '../EndingPage';
import { Icon } from '../Icons';

class DesktopBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasWidthPx: 1366,
      canvasHeightPx: 768,
    };

    this.pageWrapperEls = {};

    this.calculateCanvasSize = this.calculateCanvasSize.bind(this);
    this.calculatePageSize = this.calculatePageSize.bind(this);
    this.calculatePageStyle = this.calculatePageStyle.bind(this);
  }

  componentDidMount() {
    this.calculateCanvasSize();
    setTimeout(this.calculateCanvasSize, 500);
    window.addEventListener('resize', this.calculateCanvasSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateCanvasSize);
  }

  calculateCanvasSize() {
    this.setState({
      canvasWidthPx: this.canvasEl.offsetWidth,
      canvasHeightPx: this.canvasEl.offsetHeight,
    });
  }

  calculatePageSize(page) {
    const canvasWidthPx = this.state.canvasWidthPx / 2;
    const canvasHeightPx = this.state.canvasHeightPx;

    const {
      width: originalPageWidth,
      height: originalPageHeight,
    } = page;

    const pageSize = {
      width: 0,
      height: 0,
    };

    const canvasRatio = canvasWidthPx / canvasHeightPx;
    const pageRatio = originalPageWidth / originalPageHeight;

    // canvas is wider
    if (canvasRatio > pageRatio) {
      pageSize.width = (originalPageWidth / originalPageHeight) *
        canvasHeightPx;
      pageSize.height = canvasHeightPx;

    // page is wider
    } else {
      pageSize.width = canvasWidthPx;
      pageSize.height = (originalPageHeight / originalPageWidth) *
        canvasWidthPx;
    }

    return pageSize;
  }

  calculatePageStyle(page) {
    const pageSize = this.calculatePageSize(page);

    return {
      width: pageSize.width,
      height: pageSize.height,
      top: (
        this.state.canvasHeightPx -
        pageSize.height
      ) / 2,
    };
  }

  render() {
    const {
      pages,
      currentPageIndex,
      readingDirection,
      isFirstPageACover,
      backgroundColor,
      readingProgress,
      changePage,
      translationBalloons,
      translationBalloonOptions,
      tooltipScreenText,
      currentBalloonId,
      isEndingPageOpen,
      author,
      translator,
      baseUrl,
      nextChapter,
      nextTranslation,
      relatedSeries,
      i18n,
      selectBalloon,
      deselectBalloons,
      handleCloseBookEndingPageBtnClick,
      translationBalloonChangeSide,
    } = this.props;

    const isEven = nr => Math.floor(nr / 2) === nr / 2;
    const pageIdToIndex = pageId => pages.findIndex(page => page.id === pageId);

    // Array of pair of pages
    // [{
    //   left: Page OR null,
    //   right: Page OR null,
    // }];
    /* eslint-disable no-param-reassign */
    const pairs = pages.reduce((sum, n, index) => {
      // Initial values - LTR, no cover
      let isLeft = isEven(index);
      let pageIndex = index;

      // Modifiers
      isLeft = readingDirection === 'rtl' ? !isLeft : isLeft;
      isLeft = isFirstPageACover ? !isLeft : isLeft;
      pageIndex = isFirstPageACover ? pageIndex + 1 : pageIndex;

      const pairIndex = Math.floor(pageIndex / 2);

      const pair = isLeft ? { left: n } : { right: n };

      // Prefill pair
      sum[pairIndex] = typeof sum[pairIndex] === 'undefined' ?
        { left: null, right: null } : sum[pairIndex];

      sum[pairIndex] = {
        ...sum[pairIndex],
        ...pair,
      };

      return sum;
    }, []);
    /* eslint-enable no-param-reassign */


    // Points pair index for given page id
    /* eslint-disable no-param-reassign */
    const pairRouter = pages.reduce((sum, n, index) => {
      let pageIndex = index;
      pageIndex = isFirstPageACover ? pageIndex + 1 : pageIndex;

      const pairIndex = Math.floor(pageIndex / 2);

      sum[index] = pairIndex;

      return sum;
    }, {});
    /* eslint-enable no-param-reassign */

    const selectedPairIndex = pairRouter[currentPageIndex];
    const selectedPair = pairs[selectedPairIndex];

    const leftPageStyle = selectedPair.left !== null ?
      this.calculatePageStyle(selectedPair.left) : null;

    const rightPageStyle = selectedPair.right !== null ?
      this.calculatePageStyle(selectedPair.right) : null;

    // Calculate images to preload
    /* eslint-disable no-param-reassign */
    const imagesToPreload = pairs.reduce((sum, n, index) => {
      if (index === (selectedPairIndex - 1) || index === (selectedPairIndex + 1)) {
        if (n.left !== null) {
          sum = [...sum, n.left.url];
        }

        if (n.right !== null) {
          sum = [...sum, n.right.url];
        }
      }

      return sum;
    }, []);
    /* eslint-enable no-param-reassign */


    const handleLeftPageClick = () => {
      const indexChange = readingDirection === 'ltr' ? -1 : 1;
      let newPageIndex = readingDirection === 'ltr' ? -1 : pages.length;

      if (typeof pairs[(selectedPairIndex + indexChange)] !== 'undefined') {
        if (pairs[(selectedPairIndex + indexChange)].left !== null) {
          newPageIndex = pageIdToIndex(pairs[(selectedPairIndex + indexChange)].left.id);
        } else if (pairs[(selectedPairIndex + indexChange)].right !== null) {
          newPageIndex = pageIdToIndex(pairs[(selectedPairIndex + indexChange)].right.id);
        }
      }

      changePage(newPageIndex);
    };

    const handleRightPageClick = () => {
      const indexChange = readingDirection === 'ltr' ? 1 : -1;
      let newPageIndex = readingDirection === 'ltr' ? pages.length : -1;

      if (typeof pairs[(selectedPairIndex + indexChange)] !== 'undefined') {
        if (pairs[(selectedPairIndex + indexChange)].right !== null) {
          newPageIndex = pageIdToIndex(pairs[(selectedPairIndex + indexChange)].right.id);
        } else if (pairs[(selectedPairIndex + indexChange)].left !== null) {
          newPageIndex = pageIdToIndex(pairs[(selectedPairIndex + indexChange)].left.id);
        }
      }
      changePage(newPageIndex);
    };

    return (
      <div
        ref={(el) => { this.canvasEl = el; }}
        className={s.DesktopBook}
      >
        <div
          className={s.DesktopBook__pair}
          style={{ backgroundColor }}
        >

          {/* LEFT PAGE */}
          <div
            className={classnames(
              s.DesktopBook__pair__page,
              s.DesktopBook__pair__page_left,
            )}
            onClick={handleLeftPageClick}
          >
            {selectedPair.left !== null ?
              <div
                style={leftPageStyle}
                className={s.DesktopBook__pair__page__wrapper}
              >
                <img
                  src={selectedPair.left.url}
                  alt="Left page"
                  className={s.DesktopBook__pair__page__img}
                />
                <div className={s.DesktopBook__pair__page__content}>
                  {translationBalloons[selectedPair.left.id].map(translationBalloon =>
                    <TranslationBalloon
                      key={translationBalloon.id}
                      id={translationBalloon.id}
                      posX={translationBalloon.posX}
                      posY={translationBalloon.posY}
                      width={translationBalloon.width}
                      height={translationBalloon.height}
                      text={translationBalloon.text}
                      isSelected={currentBalloonId === translationBalloon.id}
                      pageWidth={leftPageStyle.width}
                      pageHeight={leftPageStyle.height}
                      options={translationBalloonOptions[translationBalloon.id]}
                      selectBalloon={selectBalloon}
                      deselectBalloons={deselectBalloons}
                      changeSide={translationBalloonChangeSide}
                    />,
                  )}
                </div>
              </div>
              :
              <div className={s.DesktopBook__pair__page__noImg} />
            }
          </div>

          {/* RIGHT PAGE */}
          <div
            className={classnames(
              s.DesktopBook__pair__page,
              s.DesktopBook__pair__page_right,
            )}
            onClick={handleRightPageClick}
          >
            {selectedPair.right !== null ?
              <div
                style={rightPageStyle}
                className={s.DesktopBook__pair__page__wrapper}
              >
                <img
                  src={selectedPair.right.url}
                  alt="Right page"
                  className={s.DesktopBook__pair__page__img}
                />
                <div className={s.DesktopBook__pair__page__content}>
                  {translationBalloons[selectedPair.right.id].map(translationBalloon =>
                    <TranslationBalloon
                      key={translationBalloon.id}
                      id={translationBalloon.id}
                      posX={translationBalloon.posX}
                      posY={translationBalloon.posY}
                      width={translationBalloon.width}
                      height={translationBalloon.height}
                      text={translationBalloon.text}
                      isSelected={currentBalloonId === translationBalloon.id}
                      pageWidth={rightPageStyle.width}
                      pageHeight={rightPageStyle.height}
                      options={translationBalloonOptions[translationBalloon.id]}
                      selectBalloon={selectBalloon}
                      deselectBalloons={deselectBalloons}
                      changeSide={translationBalloonChangeSide}
                    />,
                  )}
                </div>
              </div>
              :
              <div className={s.DesktopBook__pair__page__noImg} />
            }
          </div>
        </div>
        {tooltipScreenText.length > 0 &&
          <div className={s.DesktopBook__screenTooltip}>
            <div className={s.DesktopBook__screenTooltip__wrapper}>
              {tooltipScreenText}
            </div>
          </div>
        }
        <div className={s.DesktopBook__progressBar}>
          <ProgressBar progress={readingProgress} />
        </div>
        {isEndingPageOpen &&
          <div className={s.DesktopBook__endingPage}>
            <div
              className={s.DesktopBook__endingPage__closeBtn}
              onClick={handleCloseBookEndingPageBtnClick}
            >
              <Icon name="arrowLeft" /> Back to reading
            </div>
            <div className={s.DesktopBook__endingPage__content}>
              <EndingPage
                author={author}
                translator={translator}
                baseUrl={baseUrl}
                nextChapter={nextChapter}
                nextTranslation={nextTranslation}
                relatedSeries={relatedSeries}
                i18n={i18n}
              />
            </div>
          </div>
        }
        <div className={s.DesktopBook__preloader}>
          {imagesToPreload.map(url =>
            <img
              key={url}
              src={url}
              className={s.DesktopBook__preloader__img}
              alt="Page that is preloaded"
            />,
          )}
        </div>
      </div>
    );
  }
}

DesktopBook.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  })).isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  readingDirection: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
  isFirstPageACover: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  readingProgress: PropTypes.number.isRequired,
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
  translationBalloonOptions: PropTypes.objectOf(PropTypes.shape({
    side: PropTypes.oneOf(['screen', 'up', 'right', 'down', 'left']).isRequired,
  })).isRequired,
  tooltipScreenText: PropTypes.string.isRequired,
  currentBalloonId: PropTypes.number.isRequired,
  isEndingPageOpen: PropTypes.bool.isRequired,
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
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  handleCloseBookEndingPageBtnClick: PropTypes.func.isRequired,
  translationBalloonChangeSide: PropTypes.func.isRequired,
};

export default DesktopBook;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Observer from 'react-intersection-observer';
import * as styles from './index.scss';
import Page from './Page';
import ProgressBar from '../ProgressBar';
import EndingPage from '../EndingPage';

class Webcomic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasWidthPx: 0,
      canvasHeightPx: 0,
      isScrolled: false,
    };

    this.calculateSizes = this.calculateSizes.bind(this);
    this.handlePageVisibilityChange = this.handlePageVisibilityChange
      .bind(this);
    this.scrollToCurrentPage = this.scrollToCurrentPage.bind(this);
  }

  componentDidMount() {
    setTimeout(this.calculateSizes, 500);
    window.addEventListener('resize', this.calculateSizes);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateSizes);
  }

  calculateSizes() {
    const canvasWidthPx = this.canvasWrapperElement.offsetWidth;
    const canvasHeightPx = this.canvasWrapperElement.offsetHeight;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ canvasWidthPx, canvasHeightPx });
    this.scrollToCurrentPage(canvasWidthPx);
  }

  scrollToCurrentPage(canvasWidthPx) {
    const { pages, currentPageIndex } = this.props;

    const scrollTop = currentPageIndex > 1 ?
      pages.reduce((sum, page, pageIndex) => {
        if (pageIndex < currentPageIndex) {
          return (sum + ((page.height * canvasWidthPx) / page.width));
        }
        return sum;
      }, 0)
      :
      0;

    setTimeout(() => {
      this.canvasElement.scrollTop = scrollTop;
      this.setState({ isScrolled: true });
    });
  }

  handlePageVisibilityChange(pageIndex, isVisible) {
    if (isVisible && this.state.isScrolled) {
      this.props.changePage(pageIndex);
    }
  }

  render() {
    const {
      pages,
      readingProgress,
      translationBalloons,
      translationBalloonOptions,
      tooltipScreenText,
      currentBalloonId,
      backgroundColor,
      nextChapter,
      nextTranslation,
      author,
      translator,
      baseUrl,
      relatedSeries,
      i18n,
      isZoomed,
      selectBalloon,
      deselectBalloons,
      translationBalloonChangeSide,
      zoomIn,
      zoomOut,
    } = this.props;

    const webcomicStyle = {
      backgroundColor,
    };

    return (
      <div
        className={styles.Webcomic}
        style={webcomicStyle}
      >
        <div
          className={styles.Webcomic__canvas}
          ref={(canvas) => { this.canvasElement = canvas; }}
          style={{ touchAction: isZoomed ? 'none' : 'auto' }}
        >
          <div
            className={styles.Webcomic__canvas__wrapper}
            ref={(canvasWrapper) => { this.canvasWrapperElement = canvasWrapper; }}
          >
            {pages.map((page, pageIndex) =>
              <Observer
                key={page.id}
                onChange={isVisible => this.handlePageVisibilityChange(
                  pageIndex,
                  isVisible,
                )}
              >
                <Page
                  url={page.url}
                  width={page.width}
                  height={page.height}
                  realWidth={this.state.canvasWidthPx}
                  realHeight={(this.state.canvasWidthPx * page.height) /
                    page.width}
                  translationBalloons={translationBalloons[page.id]}
                  translationBalloonOptions={translationBalloonOptions}
                  currentBalloonId={currentBalloonId}
                  isZoomed={isZoomed}
                  selectBalloon={selectBalloon}
                  deselectBalloons={deselectBalloons}
                  translationBalloonChangeSide={translationBalloonChangeSide}
                  zoomIn={zoomIn}
                  zoomOut={zoomOut}
                />
              </Observer>,
            )}
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
        {tooltipScreenText.length > 0 &&
          <div className={styles.Webcomic__screenTooltip}>
            <div className={styles.Webcomic__screenTooltip__wrapper}>
              {tooltipScreenText}
            </div>
          </div>
        }
        <div className={styles.Webcomic__progressBar}>
          <ProgressBar progress={readingProgress} />
        </div>
      </div>
    );
  }
}

Webcomic.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  })).isRequired,
  currentPageIndex: PropTypes.number.isRequired,
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
  readingProgress: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
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
  isZoomed: PropTypes.bool.isRequired,
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  translationBalloonChangeSide: PropTypes.func.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
};

export default Webcomic;

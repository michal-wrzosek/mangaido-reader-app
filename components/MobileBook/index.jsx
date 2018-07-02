import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import * as s from './index.scss';
import Page from './Page';
import ProgressBar from '../ProgressBar';
import EndingPage from '../EndingPage';
import { Icon } from '../Icons';

const getPhase = (pageIndex, exposedPageIndexes) => {
  const indexesBehind = [
    Math.min(...exposedPageIndexes) - 1,
    Math.min(...exposedPageIndexes) - 2,
  ];
  const indexesAhead = [
    Math.max(...exposedPageIndexes) + 1,
    Math.max(...exposedPageIndexes) + 2,
  ];

  if (exposedPageIndexes.includes(pageIndex)) {
    return 'exposed';
  } else if (indexesBehind.includes(pageIndex)) {
    return 'behind';
  } else if (indexesAhead.includes(pageIndex)) {
    return 'ahead';
  }

  return 'hidden';
};

class MobileBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      swiped: 0,
      bookWidth: 320,
      bookHeight: 455,
      pageWidth: 320,
      pageHeight: 455,
    };

    this.minSwipe = 0.5;
    this.pageSpace = 40;

    this.handleSwiping = this.handleSwiping.bind(this);
    this.handleSwipedLeft = this.handleSwipedLeft.bind(this);
    this.handleSwipedRight = this.handleSwipedRight.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);
    this.calculateCanvasSize = this.calculateCanvasSize.bind(this);
  }

  componentDidMount() {
    this.calculateCanvasSize();
    setTimeout(this.calculateCanvasSize, 500);
    window.addEventListener('resize', this.calculateCanvasSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateCanvasSize);
  }

  getSide(pageIndex) {
    let isRight = false;

    if (pageIndex % 2) {
      isRight = !isRight;
    }

    if (this.props.readingDirection === 'rtl') {
      isRight = !isRight;
    }

    if (this.props.isFirstPageACover) {
      isRight = !isRight;
    }

    return isRight ? 'right' : 'left';
  }

  getCanvasWidth() {
    const nrOfSpaces = [...Array(this.props.pages.length).keys()]
      .filter(index => this.getSide(index) === 'right')
      .length;
    let width = this.props.pages.length * this.state.pageWidth;
    width += nrOfSpaces * this.pageSpace;
    return width;
  }

  getCanvasOfset() {
    const pageIndexesOnLeft = [...Array(this.props.pages.length).keys()]
    .filter((index) => {
      if (this.props.readingDirection === 'ltr') {
        return index < this.props.currentPageIndex;
      }

      return index > this.props.currentPageIndex;
    });

    const nrOfSpacesOnLeft = pageIndexesOnLeft
      .filter(index => this.getSide(index) === 'right')
      .length;

    let offset = pageIndexesOnLeft.length * this.state.pageWidth;
    offset += nrOfSpacesOnLeft * this.pageSpace;
    offset *= -1;

    if (this.state.swiped !== 0) {
      offset += (this.state.swiped * this.state.bookWidth) * -1;
    }
    return offset;
  }

  getExposedPageIndexes() {
    const exposedPageIndexes = [this.props.currentPageIndex];

    if (this.getSide(this.props.currentPageIndex) === 'left') {
      exposedPageIndexes.push(this.props.currentPageIndex + 1);
    } else {
      exposedPageIndexes.push(this.props.currentPageIndex - 1);
    }

    return exposedPageIndexes;
  }

  calculateCanvasSize() {
    this.setState({
      bookWidth: this.bookElement.offsetWidth,
      bookHeight: (this.bookElement.offsetWidth / this.props.pageRatio),
      pageWidth: this.bookElement.offsetWidth,
      pageHeight: (this.bookElement.offsetWidth / this.props.pageRatio),
    });
  }

  handleSwiped() {
    this.setState({
      swiped: 0,
    });
  }

  handleSwipedRight(e, deltaX, isFlick) {
    if (
      isFlick ||
      Math.abs(deltaX) >= (this.state.bookWidth * this.minSwipe)
    ) {
      if (this.props.readingDirection === 'ltr') {
        this.props.previousPage();
      } else {
        this.props.nextPage();
      }
    }
  }

  handleSwipedLeft(e, deltaX, isFlick) {
    if (
      isFlick ||
      Math.abs(deltaX) >= (this.state.bookWidth * this.minSwipe)
    ) {
      if (this.props.readingDirection === 'ltr') {
        this.props.nextPage();
      } else {
        this.props.previousPage();
      }
    }
  }

  handleSwiping(e, deltaX) {
    this.setState({
      swiped: deltaX / this.state.bookWidth,
    });
  }

  render() {
    const {
      pages,
      translationBalloons,
      translationBalloonOptions,
      tooltipScreenText,
      currentBalloonId,
      readingProgress,
      readingDirection,
      backgroundColor,
      isEndingPageOpen,
      author,
      translator,
      baseUrl,
      nextChapter,
      nextTranslation,
      relatedSeries,
      i18n,
      isZoomed,
      zoomIn,
      zoomOut,
      selectBalloon,
      deselectBalloons,
      handleCloseBookEndingPageBtnClick,
      translationBalloonChangeSide,
    } = this.props;

    const {
      bookHeight,
      pageWidth,
      pageHeight,
    } = this.state;

    const exposedPageIndexes = this.getExposedPageIndexes();

    const bookStyle = {
      backgroundColor,
    };

    const canvasStyle = {
      width: `${this.getCanvasWidth()}px`,
      height: `${bookHeight}px`,
      transform: `translate3d(${this.getCanvasOfset()}px, 0, 0)`,
    };

    return (
      <div
        className={s.Book}
        style={bookStyle}
        ref={(book) => { this.bookElement = book; }}
      >
        <Swipeable
          onSwiping={this.handleSwiping}
          onSwipedLeft={this.handleSwipedLeft}
          onSwipedRight={this.handleSwipedRight}
          onSwiped={this.handleSwiped}
          trackMouse={true}
          disabled={isZoomed === true}
          className={s.Book__swipeable}
        >
          <div
            className={s.Book__canvas}
            style={canvasStyle}
          >
            {pages.map((page, pageIndex) => (
              <Page
                key={page.id}
                url={page.url}
                width={pageWidth}
                height={pageHeight}
                readingDirection={readingDirection}
                side={this.getSide(pageIndex)}
                phase={getPhase(pageIndex, exposedPageIndexes)}
                translationBalloons={translationBalloons[page.id]}
                translationBalloonOptions={translationBalloonOptions}
                currentBalloonId={currentBalloonId}
                isZoomed={isZoomed}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                selectBalloon={selectBalloon}
                deselectBalloons={deselectBalloons}
                translationBalloonChangeSide={translationBalloonChangeSide}
              />
            ))}
          </div>
        </Swipeable>
        {tooltipScreenText.length > 0 &&
          <div className={s.Book__screenTooltip}>
            {tooltipScreenText}
          </div>
        }
        <div className={s.Book__progressBar}>
          <ProgressBar progress={readingProgress} />
        </div>
        {isEndingPageOpen &&
          <div className={s.Book__endingPage}>
            <div
              className={s.Book__endingPage__closeBtn}
              onClick={handleCloseBookEndingPageBtnClick}
            >
              <Icon name="arrowLeft" /> Back to reading
            </div>
            <div className={s.Book__endingPage__content}>
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
      </div>
    );
  }
}

MobileBook.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  })).isRequired,
  pageRatio: PropTypes.number.isRequired,
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
  readingDirection: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
  isFirstPageACover: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
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
  isZoomed: PropTypes.bool.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  handleCloseBookEndingPageBtnClick: PropTypes.func.isRequired,
  translationBalloonChangeSide: PropTypes.func.isRequired,
};

export default MobileBook;

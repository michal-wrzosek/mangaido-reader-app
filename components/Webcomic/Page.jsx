import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as s from './Page.scss';
import TranslationBalloon from '../TranslationBalloon';
import Spinner from '../Spinner';
import PinchZoomPan from '../PinchZoomPan';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoaded: false };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  handleImageLoaded() {
    this.setState({ isLoaded: true });
  }

  render() {
    const {
      url,
      width,
      height,
      realWidth,
      realHeight,
      translationBalloons,
      translationBalloonOptions,
      currentBalloonId,
      isZoomed,
      selectBalloon,
      deselectBalloons,
      translationBalloonChangeSide,
      zoomIn,
      zoomOut,
    } = this.props;

    const { isLoaded } = this.state;

    const pageStyle = {
      paddingBottom: `${(height * 100) / width}%`,
    };

    return (
      <div
        className={s.Page}
        style={pageStyle}
      >
        <PinchZoomPan
          width={realWidth}
          height={realHeight}
          isZoomed={isZoomed}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
        >
          {(zoomX, zoomY, zoomScale) => (
            <div
              className={s.Page__zoom}
              style={{
                transform: `translate3d(${zoomX}px, ${zoomY}px, 0) scale(${zoomScale})`,
                transformOrigin: '0 0',
                touchAction: isZoomed ? 'none' : 'auto',
              }}
            >
              {!isLoaded &&
                <div className={s.Page__spinner}>
                  <Spinner />
                </div>
              }
              <img
                className={s.Page__img}
                src={url}
                alt={''}
                onLoad={this.handleImageLoaded}
              />
              {isZoomed !== true && translationBalloons.map(translationBalloon =>
                <TranslationBalloon
                  key={translationBalloon.id}
                  id={translationBalloon.id}
                  chapterImageId={translationBalloon.chapterImageId}
                  position={translationBalloon.position}
                  posX={translationBalloon.posX}
                  posY={translationBalloon.posY}
                  width={translationBalloon.width}
                  height={translationBalloon.height}
                  text={translationBalloon.text}
                  isSelected={currentBalloonId === translationBalloon.id}
                  pageWidth={realWidth}
                  pageHeight={realHeight}
                  options={translationBalloonOptions[translationBalloon.id]}
                  selectBalloon={selectBalloon}
                  deselectBalloons={deselectBalloons}
                  changeSide={translationBalloonChangeSide}
                />,
              )}
            </div>
          )}
        </PinchZoomPan>
      </div>
    );
  }
}

Page.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  realWidth: PropTypes.number.isRequired,
  realHeight: PropTypes.number.isRequired,
  translationBalloons: PropTypes.arrayOf(PropTypes.shape({
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
  currentBalloonId: PropTypes.number.isRequired,
  isZoomed: PropTypes.bool.isRequired,
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  translationBalloonChangeSide: PropTypes.func.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
};

export default Page;

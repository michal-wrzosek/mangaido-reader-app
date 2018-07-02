import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as s from './Page.scss';
import TranslationBalloon from '../TranslationBalloon';
import PinchZoomPan from '../PinchZoomPan';

const Page = ({
  url,
  width,
  height,
  readingDirection,
  side,
  phase,
  translationBalloons,
  translationBalloonOptions,
  currentBalloonId,
  isZoomed,
  zoomIn,
  zoomOut,
  selectBalloon,
  deselectBalloons,
  translationBalloonChangeSide,
}) => {
  const pageClassNames = classnames({
    [s.Page]: true,
    [s.Page_ltr]: readingDirection === 'ltr',
    [s.Page_rtl]: readingDirection === 'rtl',
    [s.Page_left]: side === 'left',
    [s.Page_right]: side === 'right',
    [s.Page_behind]: phase === 'behind',
    [s.Page_exposed]: phase === 'exposed',
    [s.Page_ahead]: phase === 'ahead',
    [s.Page_hidden]: phase === 'hidden',
  });

  const pageStyle = {
    width,
    height,
  };

  return (
    <div
      className={pageClassNames}
      style={pageStyle}
    >
      <PinchZoomPan
        width={width}
        height={height}
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
            <img
              className={s.Page__img}
              src={url}
              alt=""
            />
            {isZoomed !== true && translationBalloons.map(translationBalloon =>
              <TranslationBalloon
                key={translationBalloon.id}
                id={translationBalloon.id}
                posX={translationBalloon.posX}
                posY={translationBalloon.posY}
                width={translationBalloon.width}
                height={translationBalloon.height}
                text={translationBalloon.text}
                isSelected={currentBalloonId === translationBalloon.id}
                pageWidth={width}
                pageHeight={height}
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
};

Page.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  readingDirection: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
  side: PropTypes.oneOf(['left', 'right']).isRequired,
  phase: PropTypes.oneOf(['behind', 'exposed', 'ahead', 'hidden']).isRequired,
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
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  translationBalloonChangeSide: PropTypes.func.isRequired,
};

export default Page;

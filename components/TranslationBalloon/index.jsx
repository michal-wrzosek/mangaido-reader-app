import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './index.scss';

class TranslationBalloon extends Component {
  constructor(props) {
    super(props);

    this.tooltipMaxWidthMod = 0.4;

    this.handleClickBalloon = this.handleClickBalloon.bind(this);
    this.calculateTooltipSize = this.calculateTooltipSize.bind(this);
    this.calculateBalloonXY = this.calculateBalloonXY.bind(this);
    this.getTooltipSide = this.getTooltipSide.bind(this);
    this.isTooltipOk = this.isTooltipOk.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      isSelected,
      pageWidth,
      pageHeight,
    } = this.props;

    return (
      (isSelected !== nextProps.isSelected) ||
      (pageWidth !== nextProps.pageWidth) ||
      (pageHeight !== nextProps.pageHeight)
    );
  }

  getTooltipSide() {
    const {
      balloonXPx,
      balloonYPx,
      balloonWidthPx,
      balloonHeightPx,
    } = this.calculateBalloonXY();

    const {
      tooltipWidthPx,
      tooltipHeightPx,
    } = this.calculateTooltipSize();

    // UP
    const tooltipUpXPx = balloonXPx +
      ((balloonWidthPx / 2) - (tooltipWidthPx / 2));
    const tooltipUpYPx = balloonYPx - tooltipHeightPx;

    // RIGHT
    const tooltipRightXPx = balloonXPx + balloonWidthPx;
    const tooltipRightYPx = balloonYPx +
      ((balloonHeightPx / 2) - (tooltipHeightPx / 2));

    // DOWN
    const tooltipDownXPx = balloonXPx +
      ((balloonWidthPx / 2) - (tooltipWidthPx / 2));
    const tooltipDownYPx = balloonYPx + balloonHeightPx;

    // LEFT
    const tooltipLeftXPx = balloonXPx - tooltipWidthPx;
    const tooltipLeftYPx = balloonYPx +
      ((balloonHeightPx / 2) - (tooltipHeightPx / 2));

    if (this.isTooltipOk(
      tooltipUpXPx,
      tooltipUpYPx,
      tooltipWidthPx,
      tooltipHeightPx,
    )) {
      return 'up';
    } else if (this.isTooltipOk(
      tooltipDownXPx,
      tooltipDownYPx,
      tooltipWidthPx,
      tooltipHeightPx,
    )) {
      return 'down';
    } else if (this.isTooltipOk(
      tooltipLeftXPx,
      tooltipLeftYPx,
      tooltipWidthPx,
      tooltipHeightPx,
    )) {
      return 'left';
    } else if (this.isTooltipOk(
      tooltipRightXPx,
      tooltipRightYPx,
      tooltipWidthPx,
      tooltipHeightPx,
    )) {
      return 'right';
    }

    // FALLBACK - SHOW ON FIXED SCREEN
    return 'screen';
  }

  isTooltipOk(tooltipXPx, tooltipYPx, tooltipWidthPx, tooltipHeightPx) {
    const {
      pageWidth,
      pageHeight,
    } = this.props;

    let isOk = false;

    if (
      tooltipXPx >= 0 &&
      tooltipXPx <= pageWidth &&
      (tooltipXPx + tooltipWidthPx) >= 0 &&
      (tooltipXPx + tooltipWidthPx) <= pageWidth &&
      tooltipYPx >= 0 &&
      tooltipYPx <= pageHeight &&
      (tooltipYPx + tooltipHeightPx) >= 0 &&
      (tooltipYPx + tooltipHeightPx) <= pageHeight
    ) {
      isOk = true;
    }

    return isOk;
  }

  calculateTooltipSize() {
    const tooltipWidthPx = typeof this.tooltipElement !== 'undefined' ?
      this.tooltipElement.offsetWidth : 0;
    const tooltipHeightPx = typeof this.tooltipElement !== 'undefined' ?
      this.tooltipElement.offsetHeight : 0;

    return {
      tooltipWidthPx,
      tooltipHeightPx,
    };
  }

  calculateBalloonXY() {
    const {
      posX,
      posY,
      width,
      height,
      pageWidth,
      pageHeight,
    } = this.props;

    return {
      balloonXPx: (pageWidth * posX) / 100,
      balloonYPx: (pageHeight * posY) / 100,
      balloonWidthPx: (pageWidth * width) / 100,
      balloonHeightPx: (pageHeight * height) / 100,
    };
  }

  handleClickBalloon(event, balloonId) {
    event.stopPropagation();

    if (this.props.isSelected) {
      this.props.deselectBalloons();
    } else {
      this.props.selectBalloon(balloonId);
    }
  }

  render() {
    const {
      id,
      posX,
      posY,
      width,
      height,
      text,
      isSelected,
      pageWidth,
      options,
      changeSide,
    } = this.props;

    const tooltipSide = this.getTooltipSide();

    if (options.side !== tooltipSide) {
      setTimeout(() => changeSide(id, tooltipSide));
    }

    const translationBalloonStyle = {
      top: `${posY}%`,
      left: `${posX}%`,
      width: `${width}%`,
      height: `${height}%`,
    };

    const tooltipStyle = {
      width: `${pageWidth * this.tooltipMaxWidthMod}px`,
    };

    return (
      <div
        className={classNames({
          [styles.TranslationBalloon]: true,
          [styles.TranslationBalloon_selected]: isSelected,
        })}
        style={translationBalloonStyle}
        onClick={event => this.handleClickBalloon(event, id)}
      >
        <div
          className={classNames({
            [styles.TranslationBalloon__tooltip]: true,
            [styles.TranslationBalloon__tooltip_up]: tooltipSide === 'up',
            [styles.TranslationBalloon__tooltip_right]: tooltipSide === 'right',
            [styles.TranslationBalloon__tooltip_down]: tooltipSide === 'down',
            [styles.TranslationBalloon__tooltip_left]: tooltipSide === 'left',
            [styles.TranslationBalloon__tooltip_hidden]: tooltipSide === 'screen',
          })}
          style={tooltipStyle}
          ref={(tooltip) => { this.tooltipElement = tooltip; }}
        >
          <div className={styles.TranslationBalloon__tooltipWrapper}>
            {text}
          </div>
        </div>
      </div>
    );
  }
}

TranslationBalloon.propTypes = {
  id: PropTypes.number.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  pageWidth: PropTypes.number.isRequired,
  pageHeight: PropTypes.number.isRequired,
  options: PropTypes.shape({
    side: PropTypes.oneOf(['screen', 'up', 'right', 'down', 'left']).isRequired,
  }).isRequired,
  selectBalloon: PropTypes.func.isRequired,
  deselectBalloons: PropTypes.func.isRequired,
  changeSide: PropTypes.func.isRequired,
};

export default TranslationBalloon;

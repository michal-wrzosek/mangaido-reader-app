import React from 'react';
import classnames from 'classnames';
import * as s from './index.scss';

const Spinner = () => (
  <div className={s.skCircle}>
    <div className={classnames(s.skCircle__1, s.skCircle__child)} />
    <div className={classnames(s.skCircle__2, s.skCircle__child)} />
    <div className={classnames(s.skCircle__3, s.skCircle__child)} />
    <div className={classnames(s.skCircle__4, s.skCircle__child)} />
    <div className={classnames(s.skCircle__5, s.skCircle__child)} />
    <div className={classnames(s.skCircle__6, s.skCircle__child)} />
    <div className={classnames(s.skCircle__7, s.skCircle__child)} />
    <div className={classnames(s.skCircle__8, s.skCircle__child)} />
    <div className={classnames(s.skCircle__9, s.skCircle__child)} />
    <div className={classnames(s.skCircle__10, s.skCircle__child)} />
    <div className={classnames(s.skCircle__11, s.skCircle__child)} />
    <div className={classnames(s.skCircle__12, s.skCircle__child)} />
  </div>
);

export default Spinner;

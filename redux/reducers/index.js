import { combineReducers } from 'redux';
import app from './app';
import users from './users';
import series from './series';
import chapter from './chapter';
import chapterImages from './chapterImages';
import chapters from './chapters';
import nextChapter from './nextChapter';
import nextTranslation from './nextTranslation';
import translation from './translation';
import translationBalloons from './translationBalloons';
import translationBalloonOptions from './translationBalloonOptions';
import translations from './translations';
import book from './book';
import callTokens from './callTokens';
import languages from './languages';
import comments from './comments';
import relatedSeries from './relatedSeries';
import i18n from './i18n';

const rootReducer = combineReducers({
  app,
  users,
  series,
  chapter,
  chapterImages,
  chapters,
  nextChapter,
  nextTranslation,
  translation,
  translationBalloons,
  translationBalloonOptions,
  translations,
  book,
  callTokens,
  languages,
  comments,
  relatedSeries,
  i18n,
});

export default rootReducer;

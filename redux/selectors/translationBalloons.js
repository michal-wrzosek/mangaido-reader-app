import { createSelector } from 'reselect';

const getChapterImages = state => state.chapterImages;
const getTranslationBalloons = state => state.translationBalloons;

export const getTranslationBalloonsByChapterImagesId = createSelector(
  [getChapterImages, getTranslationBalloons],
  (chapterImages, translationBalloons) => {
    const result = chapterImages.reduce((sum, ci) => ({
      ...sum,
      [ci.id]: [],
    }), {});

    [...translationBalloons.map(tb => ({ ...tb }))]
    .sort((tbA, tbB) => tbA.position - tbB.position)
    .forEach((tb) => {
      if (typeof result[tb.chapterImageId] === 'undefined') {
        result[tb.chapterImageId] = [];
      }

      result[tb.chapterImageId] = [
        ...result[tb.chapterImageId],
        tb,
      ];
    });

    return result;
  },
);

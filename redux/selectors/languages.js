import { createSelector } from 'reselect';

const getLanguages = state => state.languages;

const languagesDeepCopy = languages => [
  ...languages.map(l => ({ ...l })),
];

export const getLanguagesSorted = createSelector(
  [getLanguages],
  languages => languagesDeepCopy(languages).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  }),
);

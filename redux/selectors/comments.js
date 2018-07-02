import { createSelector } from 'reselect';

const getComments = state => state.comments;

const commentsDeepCopy = comments => [
  ...comments.map(c => ({
    ...c,
    user: {
      ...c.user,
      avatarUrl: { ...c.user.avatarUrl },
    },
    createdAt: { ...c.createdAt },
  })),
];

export const getCommentsSorted = createSelector(
  [getComments],
  comments => commentsDeepCopy(comments).sort((a, b) => {
    if (a.createdAt.timestamp > b.createdAt.timestamp) {
      return 1;
    } else if (a.createdAt.timestamp < b.createdAt.timestamp) {
      return -1;
    }
    return 0;
  }),
);

import axios, { CancelToken } from '../axios';
import * as types from '../constants';

export function create(language) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().app;
    const { id: chapterId } = getState().chapter;
    const { createTranslation: callToken } = getState().callTokens;

    callToken.cancel();
    const newCallToken = CancelToken.source();

    dispatch({
      type: types.CALL_CREATE_TRANSLATION_BEGIN,
      callToken: newCallToken,
    });

    return axios.post(`${apiUrl}/translations`,
      {
        chapter_id: chapterId,
        translation: {
          language,
        },
      },
      { cancelToken: newCallToken.token },
    )
      .then(response => response.data)
      .then((data) => {
        dispatch({
          type: types.CALL_CREATE_TRANSLATION_SUCCESS,
          translation: {
            id: data.translation.id,
            language: data.translation.language,
            isPublished: data.translation.isPublished,
            userId: data.translation.userId,
            url: data.translation.url,
          },
        });
        document.location.href = `${data.translation.url}/edit`;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          dispatch({ type: types.CALL_CREATE_TRANSLATION_CANCEL, error });
        } else {
          dispatch({ type: types.CALL_CREATE_TRANSLATION_FAIL, error });
        }
      });
  };
}

import axios from 'axios';

axios.defaults.headers.common['X-CSRF-Token'] = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute('content');

const CancelToken = axios.CancelToken;

export { CancelToken };
export default axios;

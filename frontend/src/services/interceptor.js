import axios from "axios";
import session from "redux-persist/lib/storage/session";

const intercepted_axios = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Authorization': `Token ${sessionStorage.accessToken}`},
  });
export default intercepted_axios;
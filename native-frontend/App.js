
import { Provider } from "react-redux";
import Main from "./Main"
import store from "./src/store/store";
import axios from "axios";
// import {BACKEND_URL} from 'react-native-dotenv';
axios.defaults.baseURL = 'http://localhost:8000/api/';

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      // const token = getAccessToken();
      // const response = await axios.post("api/refresh-token/", {
      //   username: "pdf",
      //   token: token,
      // });

      // // if (response.status === 200) {
      // //   axios.defaults.headers.common[
      // //     "Authorization"
      // //   ] = `Token ${response.data["token"]}`;
      // //   setAccessToken(response.data["token"]);
      // //   return axios(error.config);
      // // }
      // // console.log(response);
    }
    console.log(error);
    refresh = false;
    return Promise.reject(error.response);
  }
);


export default function App() {
   


  return (
    <Provider store={store}>
    <Main/>
    </Provider>
  )
};
import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../state/actions/types";

const refreshToken = localStorage.getItem("refresh_token");

//check if not authorized
export const checkInitialAuth = (dispatch) => {
  localStorage.getItem("access_token") &&
    dispatch({
      type: LOGIN_FAIL,
    });
};
//Axios config
const baseURL = "http://erp.apptrix.ru/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 3000,
});

export const connectAndSaveToken = (
  formData,
  navigate,
  setUsernameError,
  setPswError,
  setMessageError,
  dispatch
) => {
  axiosInstance
    .post(`token/`, {
      username: formData.username,
      password: formData.password,
    })
    .then((res) => {
      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
      navigate("/");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      //handle errors and set them to redux store
      setMessageError(err.response.data.detail);
      setUsernameError(err.response.data.username);
      setPswError(err.response.data.password);

      //check if refresh token exist
      if (refreshToken) {
        axiosInstance
          .post("/token/refresh/", { refresh: refreshToken })
          .then((response) => {
            localStorage.setItem("access_token", response.data.access);
            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + response.data.access;
          })
          .catch((err) => {
            setMessageError(err.response.data.detail);
          });
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          errorMessage: err.response.data,
          errorStatus: err.response.status,
        },
      });
      navigate("/login");
    });
};

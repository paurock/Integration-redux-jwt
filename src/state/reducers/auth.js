import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = {
  token: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access_token", action.payload.data.access);
      localStorage.setItem("refresh_token", action.payload.data.refresh);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access_token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}

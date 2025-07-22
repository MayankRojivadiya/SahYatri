const BASE_URL = process.env.REACT_APP_API;

export const auth = {
  SIGN_UP: BASE_URL + "/api/users/register",
  LOGIN: BASE_URL + "/api/users/login",
  SENDREGOTP_API: BASE_URL + "/api/users/registerOTP",
  SENDLOGOTP_API: BASE_URL + "/api/users/loginOTP",
  GETUSER_DETAIL_API: BASE_URL + "/api/users/getUser",
};

export const rides = {
  CREATE_RIDE: BASE_URL + "/api/ride-requests",
  USER_RIDES: BASE_URL + "/api/ride-requests/",
  GET_ALL_REQUESTS: BASE_URL + "/api/ride-requests/all-ride-requests",
};

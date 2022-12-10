import makeRequest from "../index";

export const userLogin = (requestParams) => {
  return makeRequest({
    uri: "/login",
    method: "POST",
    body: JSON.stringify(requestParams),
  });
};

export const forgotPassword = (requestParams) => {
  return makeRequest({
    uri: "/forgot-password",
    method: "PUT",
    body: JSON.stringify(requestParams),
  });
};

export const validateOTP = (token, requestParams) => {
  return makeRequest({
    uri: "/validate-otp",
    method: "PUT",
    body: JSON.stringify(requestParams),
    baseAuthorization: token,
  });
};

export const newPassword = (token, requestParams) => {
  return makeRequest({
    uri: "/reset-password",
    method: "PUT",
    body: JSON.stringify(requestParams),
    authorization: token,
  });
};

export const userProfile = (token) => {
  return makeRequest({
    uri: "/api/v1/users/profile",
    method: "GET",
    authorization: token,
  });
};

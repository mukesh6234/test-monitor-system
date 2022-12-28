import makeRequest from "../index";

export const userLogin = (payload) => {
  return makeRequest({
    uri: "/login",
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const forgotPassword = (payload) => {
  return makeRequest({
    uri: "/forgot-password",
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const validateOTP = (token, payload) => {
  return makeRequest({
    uri: "/validate-otp",
    method: "PUT",
    body: JSON.stringify(payload),
    baseAuthorization: token,
  });
};

export const newPassword = (token, payload) => {
  return makeRequest({
    uri: "/reset-password",
    method: "PUT",
    body: JSON.stringify(payload),
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

export const updateProfile = (token, payload) => {
  return makeRequest({
    uri: "/api/v1/users/profile",
    method: "put",
    body: JSON.stringify(payload),
    authorization: token,
  });
};

export const updatePassword = (token, payload) => {
  return makeRequest({
    uri: "/api/v1/users/change_password",
    method: "put",
    body: JSON.stringify(payload),
    authorization: token,
  });
};

import makeRequest from "../index";

export const userList = (token, search) => {
  console.log(search,"  ");

  return makeRequest({
    uri: `/api/v1/users?query=${search}`,
    method: "GET",
    authorization: token,
  });
};

export const userRoles = (token) => {
  return makeRequest({
    uri: "/api/v1/users/role_groups",
    method: "GET",
    authorization: token,
  });
};

export function createUser(token, requestBody) {
  return makeRequest({
    uri: `/api/v1/users`,
    method: "POST",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function showUser(token, user_id) {
  return makeRequest({
    uri: `/api/v1/users/${user_id}`,
    method: "GET",
    authorization: token,
  });
}

export function updateUser(token, user_id, requestBody) {
  return makeRequest({
    uri: `/api/v1/users/${user_id}`,
    method: "PUT",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

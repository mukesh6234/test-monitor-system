
// // ** Import package
// import axios from "axios"

// // ** Config Import
import { apiHost } from "../../config";

// const apiConnection = axios.create({
//   baseURL: apiHost,
// })

// const getAPI = async ({ path }) => {
//   const response = await apiConnection.get(path)

//   return response.data
// }

// const postAPI = async ({ path, body }) => {
//   const response = await apiConnection.post(path, body)

//   return response.data
// }

// const putAPI = async ({ path, body }) => {
//   const response = await apiConnection.put(path, body)

//   return response.data
// }

const jsonHeaders = {
  Accept: "application/json",
  "Content-type": "application/json",
};

export default function ({
  uri,
  method = "GET",
  body,
  authorization = null,
  baseAuthorization,
  controller,
}) {
  return fetch(apiHost + uri, {
    method,
    body,
    headers: authorization
      ? Object.assign(jsonHeaders, {
        Authorization: `API_KEY ${authorization}`,
      })
      : baseAuthorization
        ? Object.assign(jsonHeaders, {
          Authorization: `Base64 ${baseAuthorization}`,
        })
        : jsonHeaders,
    signal: controller ? controller.signal : null,
  }).then(async (response) => {
    if (response.ok) {
      try {
        return response.json();
      } catch (err) {
        return true;
      }
    }
    const errorMessage = [response.status, await response.json()];
    throw errorMessage;
  });
}


const jsonHeaders = {
  Accept: "application/json",
  "Content-type": "application/json",
};
import { apiHost } from "../../config";

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

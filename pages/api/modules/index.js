import makeRequest from "../index";

export function fetchModules(token, search, projectId) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/sections?query=${search}`,
    method: "GET",
    authorization: token,
  });
}

export function createModule(token, projectId, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/sections`,
    method: "POST",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function updateModule(token, projectId, moduleId, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/sections/${moduleId}`,
    method: "PUT",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function showModules(token, projectId, moduleId) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/sections/${moduleId}`,
    method: "GET",
    authorization: token,
  });
}

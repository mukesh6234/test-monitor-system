import makeRequest from "../index";

export function fetchProjects(token,search) {
  return makeRequest({
    uri: `/api/v1/projects?query=${search}`,
    method: "GET",
    authorization: token,
  });
}

export function createProject(token, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects`,
    method: "POST",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function showProject(token, project_id) {
  return makeRequest({
    uri: `/api/v1/projects/${project_id}`,
    method: "GET",
    authorization: token,
  });
}

export function updateProject(token,project_id, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${project_id}`,
    method: "PUT",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}
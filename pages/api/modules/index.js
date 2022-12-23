import makeRequest from "../index";

export function fetchModules(token, projectId, params, search) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/sections?page=${params.page}&per_page=${params.perPage}&query=${search}`,
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

export function testCaseList(token, projectId, moduleId) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/sections/${moduleId}/list_test_cases`,
    method: "GET",
    authorization: token,
  });
}

// export function updateTestRun(token, projectId, test_plan_id, requestBody) {
//   console.log(requestBody, "requestBody");
//   return makeRequest({
//     uri: `/api/v1/projects/${projectId}/test_plans/${test_plan_id}/test_result`,
//     method: "POST",
//     authorization: token,
//     body: JSON.stringify(requestBody),
//   });
// }

export function updateTestRun(token, projectId, test_plan_id, requestBody) {
  const headers = {
    Authorization: `API_KEY ${token}`,
  };
  return fetch(
    `https://api-test-monit.katomaran.in/api/v1/projects/${projectId}/test_plans/${test_plan_id}/test_result`,
    {
      method: "POST",
      body: requestBody,
      headers: headers,
    }
  ).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    const errorMessage = [response.status, await response.json()];
    throw errorMessage;
  });
}

import makeRequest from "../index";

export const fetchTestCases = (token, search, params, id) => {
  return makeRequest({
    uri: `/api/v1/projects/${id}/test_cases?page=${params.page}&per_page=${params.perPage}&query=${search}`,
    method: "GET",
    authorization: token,
  });
};

export function createTestCase(token, projectId, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_cases`,
    method: "POST",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function updateTestCase(token, projectId, testId, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_cases/${testId}`,
    method: "PUT",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function showTestCase(token, projectId, testId) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_cases/${testId}`,
    method: "GET",
    authorization: token,
  });
}

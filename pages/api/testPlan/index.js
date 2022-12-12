import makeRequest from "../index";

export const fetchTestPlans = (token, id, search) => {
  return makeRequest({
    uri: `/api/v1/projects/${id}/test_plans?query=${search}`,
    method: "GET",
    authorization: token,
  });
};

export function createTestPlan(token, projectId, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_plans`,
    method: "POST",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function updateTestPlan(token, projectId, testPlanId, requestBody) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_plans/${testPlanId}`,
    method: "PUT",
    authorization: token,
    body: JSON.stringify(requestBody),
  });
}

export function showTestPlan(token, projectId, testPlanId) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_plans/${testPlanId}`,
    method: "GET",
    authorization: token,
  });
}

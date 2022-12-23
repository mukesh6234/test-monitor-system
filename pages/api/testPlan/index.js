import makeRequest from "../index";

export const fetchTestPlans = (token, id, params, search) => {
  return makeRequest({
    uri: `/api/v1/projects/${id}/test_plans?page=${params.page}&per_page=${params.perPage}&query=${search}`,
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

export function testPlanExecution(token, projectId, testPlanId) {
  return makeRequest({
    uri: `/api/v1/projects/${projectId}/test_plans/${testPlanId}/displays`,
    method: "GET",
    authorization: token,
  });
}

export const testPlanReport = (token, project_id, test_plan_id) => {
  return makeRequest({
    uri: `/api/v1/projects/${project_id}/test_plans/${test_plan_id}/report`,
    method: "GET",
    authorization: token,
  });
};

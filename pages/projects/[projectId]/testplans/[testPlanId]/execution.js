import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";
import { testPlanExecution } from "../../../../api/testPlan";
import { Divider } from "@mui/material";
import ExecutionCard from "components/cards/executionCard";
import { useSearch } from "context/searchContext";
import { errorHandler } from "components/helper/errorHandling";
import { titleize } from "components/helper";

function Execution() {
  const [moduleList, setModuleList] = useState([]);
  const { handleShowSearch } = useSearch();
  const auth = useAuth();
  const router = useRouter();
  const { projectId, testPlanId } = router.query;

  useEffect(() => {
    fetchExecutionList();
    handleShowSearch(false);
  }, []);

  const fetchExecutionList = async () => {
    await testPlanExecution(auth.user.auth_token, projectId, testPlanId)
      .then(({ data }) => {
        setModuleList(data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
  const cardProps = {
    projectId,
    testPlanId,
  };
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: "5px 0" }}>{titleize(moduleList.title)}</h3>
      </div>
      <Divider />
      {moduleList.sections?.map((value, index) => {
        return (
          <div style={{ margin: "20px auto" }} key={index}>
            <ExecutionCard {...value} {...cardProps} />
          </div>
        );
      })}
    </>
  );
}
export default Execution;

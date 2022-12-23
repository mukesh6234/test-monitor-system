import React, { useState, useEffect } from "react";
// import { testPlanExecution } from "../api/testPlan";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";
import { testPlanExecution } from "../../../../api/testPlan";
import { Divider } from "@mui/material";
import ExecutionCard from "components/cards/executionCard";
import { toast } from "react-hot-toast";

function Execution() {
  const [moduleList, setModuleList] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { projectId, execution } = router.query;

  useEffect(() => {
    fetchExecutionList();
  }, []);

  const fetchExecutionList = async () => {
    await testPlanExecution(auth.user.auth_token, projectId, execution[0])
      .then(({ data }) => {
        setModuleList(data);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };
  const cardProps = {
    projectId,
    execution,
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: "5px 0" }}>{moduleList.title}</h3>
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

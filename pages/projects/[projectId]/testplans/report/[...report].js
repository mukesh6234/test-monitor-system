import React, { useState, useEffect } from "react";
// import { testPlanExecution } from "../api/testPlan";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";
import { testPlanReport } from "../../../../api/testPlan";

import { Divider, Typography, Box } from "@mui/material";
import { hexToRGBA } from "@core/utils/hex-to-rgba";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import RechartsPieChart from "@core/components/charts/RechartsPieChart";

const ContentLayout = styled(Box)(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  // backgroundColor: "transparent",
  color: theme.palette.text.primary,
  padding: 20,
}));

function Report() {
  const [reports, setReports] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { projectId, report } = router.query;

  useEffect(() => {
    fetchExecutionList();
  }, []);

  const fetchExecutionList = async () => {
    await testPlanReport(auth.user.auth_token,projectId,report[0])
      .then(({ data }) => {
        setReports(data);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  console.log(reports, "bbbbb");
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: "5px 0" }}>Report</h3>
      </div>
      <Divider />
      {/* <ContentLayout
        className="navbar-content-container"
        sx={{
          backgroundColor: (theme) =>
            hexToRGBA(theme.palette.background.paper, 1),
          boxShadow: 6,
          //   height: "80vh",
        }}
      > */}
        <RechartsPieChart {...reports}/>
      {/* </ContentLayout> */}
    </>
  );
}
export default Report;

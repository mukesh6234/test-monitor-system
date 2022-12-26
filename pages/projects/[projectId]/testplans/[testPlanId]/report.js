import React, { useState, useEffect } from "react";
// import { testPlanExecution } from "../api/testPlan";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";
import { testPlanReport } from "../../../../api/testPlan";

import { Divider, Typography, Box, Grid } from "@mui/material";
import { hexToRGBA } from "@core/utils/hex-to-rgba";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import TestPlanReport from "@core/components/charts/testPlanReport";
import { Skeleton } from "@mui/material";
import ModuleReport from "@core/components/charts/moduleReport";

const ContentLayout = styled(Box)(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  // backgroundColor: "transparent",
  color: theme.palette.text.primary,
  padding: 20,
}));

const skeleton = [];
for (let i = 0; i < 12; i++) {
  skeleton.push(
    <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
      <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      <Skeleton
        animation="wave"
        height={15}
        style={{ marginBottom: 6, marginTop: 6 }}
      />
      <Skeleton animation="wave" height={15} width="70%" />
    </Grid>
  );
}

function Report() {
  const [reports, setReports] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { projectId, testPlanId } = router.query;
  const [loading, setLoading] = useState(true);

  console.log(router.query, " router.query");

  useEffect(() => {
    fetchExecutionList();
  }, []);

  const fetchExecutionList = async () => {
    await testPlanReport(auth.user.auth_token, projectId, testPlanId)
      .then(({ data }) => {
        setReports(data);
        setLoading(false);
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
      <div style={{ paddingBottom: "0.5rem" }}>
        <Divider />
      </div>
      {/* <ContentLayout
        className="navbar-content-container"
        sx={{
          backgroundColor: (theme) =>
            hexToRGBA(theme.palette.background.paper, 1),
          boxShadow: 6,
          //   height: "80vh",
        }}
      > */}
      <TestPlanReport {...reports} />
      {/* </ContentLayout> */}
      <div
        style={{
          minHeight: "65vh",
        }}
      >
        <Grid container spacing={6} marginTop>
          {loading ? (
            <>{skeleton}</>
          ) : (
            reports &&
            reports.sections.map((module, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} xl={4} key={index}>
                  <ModuleReport {...module} />
                </Grid>
              );
            })
          )}
        </Grid>
      </div>
    </>
  );
}
export default Report;

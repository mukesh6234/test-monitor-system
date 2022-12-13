import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchTestPlans, showTestPlan } from "../../../api/testPlan";
import { useAuth } from "hooks/useAuth";
import PageHeader from "components/pageHeader";
import { Grid } from "@mui/material";
import { useSearch } from "context/searchContext";
import Lottie from "lottie-react";
import noData from "../../../../public/images/lottie/nodata.json";
import { Skeleton } from "@mui/material";
import TestPlanCard from "components/cards/testPlanCard";

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

function TestPlans() {
  const [testPlanLists, setTestPlanLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEntries, setTotalEntries] = useState();
  const router = useRouter();
  const auth = useAuth();
  const searchValue = useSearch();
  const { projectId } = router.query;

  useEffect(() => {
    fetchTestPlans(auth.user.auth_token, projectId, searchValue)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setTestPlanLists(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValue]);

  const pageHeaderProps = {
    title: "Test Plan",
    buttonName: "New Test Plan",
    navigate: `/projects/${projectId}/testplans/addtestplan`,
  };

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Lottie
            animationData={noData}
            style={{
              width: "40%",
            }}
          />
        </div>
      )}
      <Grid container spacing={6} marginTop>
        {loading ? (
          <>{skeleton}</>
        ) : (
          testPlanLists.map((testPlanList,index) => {
            return (
              <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                <TestPlanCard {...{ ...testPlanList, projectId }} />
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}

export default TestPlans;

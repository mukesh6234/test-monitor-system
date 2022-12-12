import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchModules, showModules } from "../../api/modules";
import { useAuth } from "hooks/useAuth";
import PageHeader from "components/pageHeader";
import { Grid } from "@mui/material";
import ModuleDialogue from "components/modals/moduleDialogue";
import { useSearch } from "context/searchContext";
import Lottie from "lottie-react";
import noData from "../../../public/images/lottie/nodata.json";
import { Skeleton } from "@mui/material";
import TestPlanCard from "components/cards/testPlanCard";

const skeleton = [];
for (let i = 0; i < 12; i++) {
  skeleton.push(
    <Grid item xs={12} sm={6} md={3} key={i}>
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

function TestPlan() {
  const [formOpen, setFormOpen] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const searchValue = useSearch();
  const { modules } = router.query;

  useEffect(() => {
    fetchModules(auth.user.auth_token, searchValue, modules)
      .then(({ data, total_entries }) => {
        setLoading(false);
        // setTotalEntries(total_entries);
        setModuleList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValue]);

  const handleClose = () => {
    setFormOpen(!formOpen);
  };

  const handleView = (id) => {
    showModules(auth.user.auth_token, modules, id).then(({ data }) => {
      setModuleData(data);
      setFormOpen(!formOpen);
    });
  };

  const pageHeaderProps = {
    title: "Test Plan",
    buttonName: "New Test Plan",
    navigate: `/project/testplan/newtestplan`,
  };

  // const moduleCardProps = {
  //   projectId: modules,
  //   handleView,
  //   handleClose,
  //   moduleData,
  //   formOpen,
  // };

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      {/* {!loading && totalEntries === 0  (
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
              width: "50%",
            }}
          />
        </div>
      )} */}
      <Grid container spacing={6} marginTop>
        {/* {loading ? (
          <>{skeleton}</>
        ) : 
        ( */}
        
            {/* return ( */}
              <Grid item xs={12} sm={6} md={3}>
                <TestPlanCard />
              </Grid>
            {/* ); */}
       
        
      </Grid>

      {formOpen && <ModuleDialogue {...moduleCardProps} />}
    </>
  );
}

export default TestPlan;

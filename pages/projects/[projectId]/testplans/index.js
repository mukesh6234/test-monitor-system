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
import { toast } from "react-hot-toast";
import TestPlanForm from "components/modals/testPlanForm";
import { Pagination } from "@mui/material";

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
  const [testPlanId, setTestPlanId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 24;
  const router = useRouter();
  const auth = useAuth();
  const searchValue = useSearch();
  const { projectId } = router.query;

  useEffect(() => {
    testPlanIndex();
  }, [searchValue]);

  const testPlanIndex = () => {
    const params = {
      page,
      perPage,
    };
    fetchTestPlans(auth.user.auth_token, projectId, params, searchValue)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setTestPlanLists(data);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleClose = () => {
    setFormOpen(!formOpen);
    setTestPlanId("");
  };

  const handleSave = () => {
    setFormOpen(!formOpen);
    testPlanIndex();
    setTestPlanId("");
  };

  const handleEdit = (id) => {
    setTestPlanId(id);
    setFormOpen(!formOpen);
  };

  const testPlanCardProps = {
    projectId,
    handleEdit,
  };
  const pageHeaderProps = {
    title: "Test Plan",
    buttonName: "New Test Plan",
    setFormOpen,
  };

  const testPlanFormProps = {
    formTitle: testPlanId ? "Update Module" : "Add Module",
    handleClose,
    formOpen,
    id: testPlanId,
    handleSave,
  };

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries === 0 ? (
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
      ) : (
        <Grid container spacing={6} marginTop style={{ minHeight: "65vh" }}>
          {loading ? (
            <>{skeleton}</>
          ) : (
            testPlanLists.map((testPlanList, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                  <TestPlanCard {...testPlanList} {...testPlanCardProps} />
                </Grid>
              );
            })
          )}
        </Grid>
      )}
      {formOpen && <TestPlanForm {...testPlanFormProps} />}
      {totalEntries !== 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          count={Math.ceil(totalEntries / perPage)}
          page={page}
          shape="rounded"
          color="primary"
          onChange={(event, value) => setPage(value)}
          pagesize={Number(perPage)}
        />
      )}
    </>
  );
}

export default TestPlans;

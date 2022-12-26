import React, { useState, useEffect } from "react";
import PageHeader from "components/pageHeader";
import { fetchTestCases } from "../../../api/testCases";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { testCaseColumns } from "components/columns/testCaseColumns";
import { DataGrid } from "@mui/x-data-grid";
import TestCaseDialogue from "components/modals/testcaseDialogue";
import { useSearch } from "context/searchContext";
import Lottie from "lottie-react";
import noData from "../../../../public/images/lottie/nodata.json";
import { toast } from "react-hot-toast";
import { Skeleton } from "@mui/material";
import { hexToRGBA } from "@core/utils/hex-to-rgba";
import { styled } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import TestCaseCard from "components/cards/testCaseCard";
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

let showData = {};

const ContentLayout = styled(Box)(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  // backgroundColor: "transparent",
  color: theme.palette.text.primary,
  // padding: "20px 0",
}));

export default function TestCases() {
  const [testCases, setTestCases] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 24;
  const auth = useAuth();
  const searchValue = useSearch();

  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    fetchTestCaseIndex();
  }, []);

  useEffect(() => {
    fetchTestCaseIndex();
  }, [searchValue]);

  const fetchTestCaseIndex = async () => {
    const params = {
      page,
      perPage,
    };
    // if (auth.user.role_group) {
    await fetchTestCases(auth.user.auth_token, searchValue, params, projectId)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setTestCases(data);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
    // }
  };

  const handleView = (id) => {
    showData = testCases.find((value) => {
      return value.id === id;
    });
    console.log();
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const pageHeaderProps = {
    title: "Test Cases",
    buttonName: "Add Test Case",
    navigate: `/projects/${projectId}/testcases/add`,
  };

  const testDialogueProps = {
    data: showData,
    formOpen,
    handleClose,
  };

  const testCaseCardProps = {
    projectId,
    router,
    handleView,
  };

  return (
    <div>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
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
        // <ContentLayout
        //   className="navbar-content-container"
        //   sx={{
        //     backgroundColor: (theme) =>
        //       hexToRGBA(theme.palette.background.paper, 1),
        //     boxShadow: 6,

        //     //   height: "80vh",
        //   }}
        // >
        //   <DataGrid
        //     autoHeight
        //     rows={testCases}
        //     columns={testCaseColumns(projectId, router, handleView)}
        //     pagination={false}
        //     disableColumnMenu
        //     disableSelectionOnClick
        //     rowsPerPageOptions={[10, 25, 50]}
        //     loading={loading}
        //   />
        // </ContentLayout>
        <div
          style={{
            minHeight: "65vh",
          }}
        >
          <Grid container spacing={6} marginTop>
            {loading ? (
              <>{skeleton}</>
            ) : (
              testCases &&
              testCases.map((testcase, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                    <TestCaseCard {...testcase} {...testCaseCardProps} />
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      )}
      {formOpen && <TestCaseDialogue {...testDialogueProps} />}
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
    </div>
  );
}

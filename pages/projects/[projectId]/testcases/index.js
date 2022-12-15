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

let showData = {};

export default function TestCases() {
  const [testCases, setTestCases] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
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
    if (auth.user.role_group) {
      await fetchTestCases(auth.user.auth_token, searchValue, projectId)
        .then(({ data, total_entries }) => {
          setLoading(false);
          setTotalEntries(total_entries);
          setTestCases(data);
        })
        .catch((err) => {
          if (err[1]) {
            toast.error(err[1] ? err[1]?.data[0] : "Something not right");
          } else {
            toast.error(err.message);
          }
        });
    }
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
    navigate: `/projects/${projectId}/testcases/addtestcases`,
  };

  const testDialogueProps = {
    data: showData,
    formOpen,
    handleClose,
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
        <DataGrid
          autoHeight
          rows={testCases}
          columns={testCaseColumns(projectId, router, handleView)}
          pagination={false}
          disableColumnMenu
          disableSelectionOnClick
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
        />
      )}
      {formOpen && <TestCaseDialogue {...testDialogueProps} />}
    </div>
  );
}

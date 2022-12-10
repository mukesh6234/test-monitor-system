import React, { useState, useEffect } from "react";
import PageHeader from "components/pageHeader";
import { fetchTestCases } from "../../api/testCases";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { testCaseColumns } from "components/columns/testCaseColumns";
import { DataGrid } from "@mui/x-data-grid";
import TestCaseDialogue from "components/modals/testcaseDialogue";
import { useSearch } from "context/searchContext";

let showData ={};

export default function TestCases() {
  const [testCases, setTestCases] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const searchValue = useSearch();
  const { testcase } = router.query;

  useEffect(() => {
    fetchTestCaseIndex();
  }, [searchValue]);

  const fetchTestCaseIndex = async () => {
    if (auth.user.role_group) {
      await fetchTestCases(auth.user.auth_token,searchValue, testcase).then(({ data }) => {
        setTestCases(data);
      });
    }
  };

  const handleView = (id) => {
    showData = testCases.find(value => {return value.id === id});
    console.log();
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const pageHeaderProps = {
    title: "Test Cases",
    buttonName: "Add Test Case",
    navigate: `/project/testcases/addtestcases/${testcase}`,
  };

  const testDialogueProps = {
    data:showData,
    formOpen,
    handleClose,
  };

  return (
    <div>
      <PageHeader {...pageHeaderProps} />
      <DataGrid
        autoHeight
        rows={testCases}
        columns={testCaseColumns(testcase, router, handleView)}
        pagination={false}
        disableColumnMenu
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50]}
      />
      {formOpen && <TestCaseDialogue {...testDialogueProps} />}
    </div>
  );
}

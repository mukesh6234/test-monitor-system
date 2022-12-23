import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { hexToRGBA } from "@core/utils/hex-to-rgba";
import { styled } from "@mui/material/styles";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import MuiTimeline from "@mui/lab/Timeline";
import CustomTimelineDot from "@core/components/mui/timeline-dot";
import Icon from "@core/components/icon";
import TextInput from "@core/components/input/textInput";
import { testCaseList, updateTestRun } from "../../../../api/modules";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import Spinner from "@core/components/spinner";
import { titleize } from "components/helper";
import { toast } from "react-hot-toast";
import FileUploader from "components/fileUploader/imageUpload";
import noData from "../../../../../public/images/lottie/nodata.json";
import Lottie from "lottie-react";

const ContentLayout = styled(Box)(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  // backgroundColor: "transparent",
  color: theme.palette.text.primary,
  padding: 20,
}));

const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

const StyledLink = styled("a")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.primary.main,
  },
  "&:active": {
    textDecoration: "none",
  },
}));

function TestRun() {
  const [testCases, setTestCases] = useState([]);
  const [testStatus, setTestStatus] = useState([
    { comment: "", status: "", file: [], test_case_id: "" },
  ]);
  const [testIndex, setTestIndex] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [disable, setDisable] = useState(false);
  const [loading, setLoding] = useState(true);
  // const [image, setImage] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { projectId, testrun } = router.query;

  useEffect(() => {
    fetchTestCaseList();
  }, []);

  const fetchTestCaseList = () => {
    testCaseList(auth.user.auth_token, projectId, testrun[1]).then(
      ({ data, total_entries }) => {
        setTotalEntries(total_entries);
        setTestCases(data);
        setLoding(false);
      }
    );
  };

  const handleStatus = (status) => {
    if (status == "failed" && testStatus[testIndex].comment !== "") {
      const newValue = [...testStatus];
      newValue[testIndex] = {
        ...testStatus[testIndex],
        status: status,
        test_case_id: testCases[testIndex].id,
      };
      setTestStatus(newValue);
      setDisable(true);
      toast.success("Update Successfully... ");
    } else if (status != "failed") {
      const newValue = [...testStatus];
      newValue[testIndex] = {
        ...testStatus[testIndex],
        status: status,
        test_case_id: testCases[testIndex].id,
      };
      setTestStatus(newValue);
      setDisable(true);
      toast.success("Update Successfully... ");
    } else {
      setDisable(true);
      toast.error("Please fill the comments ");
    }
  };
  const handleSubmit = () => {
    let isEmpty = testStatus.some((val) => val.status == "");
    let emptyIndex = testStatus.findIndex((val) => val.status == "");
    // console.log(a, "yyyy", b);
    if (isEmpty && emptyIndex !== -1) {
      toast.error("Please update the testcase status");
      setTestIndex(emptyIndex);
    } else {
      const form = new FormData();
      testStatus.map((val) =>
        Object.keys(val).filter((keys) =>
          form.append(`results[][${keys}]`, val[keys])
        )
      );
      form.append("test_plan[section_id]", testrun[1]);
      updateTestRun(auth.user.auth_token, projectId, testrun[0], form)
        .then(({ message }) => {
          toast.success(message);
          setTimeout(() => {
            router.push(
              `/projects/${projectId}/testplans/report/ ${testrun[0]}`
            );
          }, 1000);
        })
        .catch((err) => {
          if (err[1]) {
            toast.error(
              err[1]?.data ? err[1]?.data[0] : "Internal Server Error"
            );
          } else {
            toast.error(err.message);
          }
        });
    }
  };

  const handleNextChange = () => {
    setTestIndex(testIndex + 1);
    testIndex < testCases.length &&
      testStatus.push({ comment: "", status: "", file: [], test_case_id: "" });
    setDisable(false);
  };

  // const handleUpload = (value) => {
  //   const newValue = [...testStatus];
  //   newValue[testIndex] = {
  //     ...testStatus[testIndex],
  //     file: value,
  //   };
  //   setTestStatus(newValue);
  //   // testCases && setTestStatus[testIndex].file(value)
  // };

  const handleChange = (e) => {
    const newValue = [...testStatus];
    newValue[testIndex] = {
      ...testStatus[testIndex],
      comment: e.target.value,
    };
    setTestStatus(newValue);
    setDisable(false);
  };

  console.log(
    testStatus[testIndex],
    "testStatus",
    testCases.length,
    testStatus
  );
  const fileUploaderProps = {
    // handleUpload,
    setTestStatus,
    testIndex,
    testStatus,
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ContentLayout
          className="navbar-content-container"
          sx={{
            backgroundColor: (theme) =>
              hexToRGBA(theme.palette.background.paper, 1),
            boxShadow: 6,
            height: "80vh",
          }}
        >
          {totalEntries === 0 ? (
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
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography style={{ fontSize: "1.5rem", fontWeight: 400 }}>
                    {titleize(testCases[testIndex].section_name)}
                  </Typography>
                  <span style={{ fontSize: "16px" }}>
                    {testCases[testIndex].section_description}
                  </span>
                </div>
                {testIndex === testCases.length - 1 && (
                  <div>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleSubmit()}
                    >
                      submit
                    </Button>
                  </div>
                )}
              </div>
              <Divider />
              <div style={{ display: "flex", padding: "20px 0", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: "64vh", overflow: "auto" }}>
                    <Typography style={{ fontSize: "1rem", fontWeight: 600 }}>
                      {testIndex + 1}.{testCases[testIndex].title}
                    </Typography>
                    <Typography variant="caption">
                      {testCases[testIndex].updated_by ? (
                        <>
                          Updated by:
                          <span style={{ color: "#9155FD", marginLeft: 5 }}>
                            {titleize(testCases[testIndex].updated_by?.name)}
                          </span>
                        </>
                      ) : (
                        <>
                          Created by:
                          <span style={{ color: "#9155FD", marginLeft: 5 }}>
                            {titleize(testCases[testIndex].created_by?.name)}
                          </span>
                        </>
                      )}
                    </Typography>
                    <Typography
                      style={{ fontSize: "16px", margin: "10px auto" }}
                    >
                      {testCases[testIndex].description}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      Steps
                    </Typography>

                    <Timeline>
                      {testCases[testIndex].steps.map((step, index) => (
                        <TimelineItem key={index}>
                          <TimelineSeparator>
                            <CustomTimelineDot skin="light" color="primary">
                              <span
                                style={{ fontSize: 10, padding: "2px 6px" }}
                              >
                                {index + 1}
                              </span>
                            </CustomTimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>{step.description}</TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        margin: "1rem auto",
                      }}
                    >
                      Expected Result
                    </Typography>
                    <Typography
                      style={{ fontSize: "16px", margin: "10px auto" }}
                    >
                      {testCases[testIndex].expected_result}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      // alignItems:"flex-end"
                      position: "sticky",
                      bottom: 72,
                      // width: "47%",
                      backgroundColor: "white",
                    }}
                  >
                    <StyledLink
                      onClick={() => {
                        setTestIndex(testIndex - 1);
                        // testStatus.pop();
                        setDisable(false);
                      }}
                      style={{
                        pointerEvents: testIndex == 0 ? "none" : "",
                      }}
                    >
                      <span style={{ marginRight: 5, marginTop: 5 }}>
                        <Icon icon="bx-left-arrow-circle" fontSize={20} />
                      </span>
                      Prev
                    </StyledLink>

                    <StyledLink
                      onClick={() => handleNextChange()}
                      style={{
                        pointerEvents:
                          testIndex == testCases.length - 1 ? "none" : "",
                      }}
                    >
                      Next
                      <div style={{ marginLeft: 5, marginTop: 5 }}>
                        <Icon icon="bx-right-arrow-circle" fontSize={20} />
                      </div>
                    </StyledLink>
                  </div>
                </div>
                <Divider flexItem />
                <div style={{ flex: 1 }}>
                  {" "}
                  <Typography style={{ fontSize: "1rem", fontWeight: 600 }}>
                    Comments
                  </Typography>
                  <TextInput
                    fullWidth
                    multi
                    rows={5}
                    size={"small"}
                    placeholder={"Add Your Comment"}
                    value={testStatus[testIndex].comment}
                    // onBlur={onBlur}
                    onChange={(e) => {
                      // testCases.length > 0 &&

                      handleChange(e);
                    }}

                    // helperText={errors.description && errors.description.message}
                  />
                  <div
                    style={{
                      margin: "20px auto",
                    }}
                  >
                    <FileUploader {...fileUploaderProps} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      gap: 20,
                      padding: "20px 0",
                    }}
                  >
                    <Button
                      disabled={disable}
                      fullWidth
                      style={{ padding: "10px ", fontSize: "0.9rem" }}
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => !disable && handleStatus("pass")}
                    >
                      <Icon icon="bx:check" />
                      Pass
                    </Button>
                    <Button
                      disabled={disable}
                      fullWidth
                      style={{ padding: "10px ", fontSize: "0.9rem" }}
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={() => !disable && handleStatus("skipped")}
                    >
                      <Icon icon="bx-skip-next" />
                      Skip
                    </Button>
                    <Button
                      disabled={disable}
                      fullWidth
                      style={{ padding: "10px ", fontSize: "0.9rem" }}
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => !disable && handleStatus("failed")}
                    >
                      <Icon icon="bx-block" />
                      Fail
                    </Button>
                  </div>
                </div>
              </div>{" "}
            </>
          )}
        </ContentLayout>
      )}
    </>
  );
}
export default TestRun;

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
import ImageUpload from "components/fileUploader/imageUpload";

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
  const [testIndex, setTestIndex] = useState(0);
  const [comments, setComments] = useState("");
  const [disable, setDisable] = useState(true);
  const [image, setImage] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { projectId, testrun } = router.query;
  console.log("jjjj", router.query);

  useEffect(() => {
    fetchTestCaseList();
  }, []);

  const fetchTestCaseList = () => {
    testCaseList(auth.user.auth_token, projectId, testrun[1]).then(({ data }) =>
      setTestCases(data)
    );
  };

  const handleSubmit = (status) => {
    setDisable(true);
    const form = new FormData();
    form.append("results[file]", image[0]);
    form.append("results[status]", status);
    form.append("results[comment]", comments);
    form.append("results[section_id]", testrun[1]);
    form.append("results[test_case_id]", testCases[testIndex].id);

    updateTestRun(auth.user.auth_token, projectId, testrun[0], form)
      .then(({ message }) => {
        toast.success(message);
        testIndex !== testCases.length - 1 && setTestIndex(testIndex + 1);
        setComments("");
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleNextChange = () => {
    disable
      ? toast.error("Please Update Comments and Status", "pppp")
      : (setTestIndex(testIndex + 1), setDisable(true), setImage([]));
  };

  const handleUpload = (value) => {
    setImage(value);
  };
  
  console.log(disable, "disable", image);
  return (
    <>
      {testCases.length < 1 ? (
        <Spinner />
      ) : (
        <ContentLayout
          className="navbar-content-container"
          sx={{
            backgroundColor: (theme) =>
              hexToRGBA(theme.palette.background.paper, 1),
            // border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: 6,
            height: "80vh",
            // position: "relative",
          }}
        >
          <div>
            <Typography style={{ fontSize: "1.5rem", fontWeight: 600 }}>
              {titleize(testCases[testIndex].section_name)}
            </Typography>
            <span style={{ fontSize: "16px" }}>
              {testCases[testIndex].section_description}
            </span>
          </div>
          <Divider />
          <div style={{ display: "flex", padding: "20px 0", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: "64vh", overflow: "auto" }}>
                <Typography style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {testCases[testIndex].title}
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
                <Typography style={{ fontSize: "16px", margin: "10px auto" }}>
                  {testCases[testIndex].description}
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "1rem", marginTop: "1rem" }}
                >
                  Steps
                </Typography>

                <Timeline>
                  {testCases[testIndex].steps.map((step, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <CustomTimelineDot skin="light" color="primary">
                          <span style={{ fontSize: 10, padding: "2px 6px" }}>
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
                <Typography style={{ fontSize: "16px", margin: "10px auto" }}>
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
                    setComments("");
                    setImage([]);
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
                value={comments}
                // onBlur={onBlur}
                onChange={(e) => {
                  setComments(e.target.value);
                  setDisable(true);
                }}

                // helperText={errors.description && errors.description.message}
              />
              <div
                style={{
                  margin: "20px auto",
                }}
              >
                <FileUploader onChange={handleUpload} />
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
                  fullWidth
                  style={{ padding: "10px ", fontSize: "0.9rem" }}
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => disable && handleSubmit("pass")}
                >
                  <Icon icon="bx:check" />
                  Pass
                </Button>
                <Button
                  fullWidth
                  style={{ padding: "10px ", fontSize: "0.9rem" }}
                  size="small"
                  variant="contained"
                  color="info"
                  onClick={() => disable && handleSubmit("skipped")}
                >
                  <Icon icon="bx-skip-next" />
                  Skip
                </Button>
                <Button
                  fullWidth
                  style={{ padding: "10px ", fontSize: "0.9rem" }}
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => disable && handleSubmit("failed")}
                >
                  <Icon icon="bx-block" />
                  Fail
                </Button>
              </div>
            </div>
          </div>
        </ContentLayout>
      )}
    </>
  );
}
export default TestRun;

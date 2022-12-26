import React from "react";
import { Button, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { SliceName, titleize } from "components/helper";
import Typography from "@mui/material/Typography";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import MuiTimeline from "@mui/lab/Timeline";
import { styled } from "@mui/material/styles";
import CustomTimelineDot from "@core/components/mui/timeline-dot";

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

function TestCaseDialogue(props) {
  return (
    <Dialog open={props.formOpen} onClose={props.handleClose} scroll={"paper"}>
      <div
        style={{
          boxShadow: " 3px 3px 18px rgba(145, 85, 253, 0.11)",
          borderRadius: "15px",
          minWidth: "600px",
        }}
      >
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {props.data.title > 23 ? (
                <Tooltip
                  arrow
                  title={props.title}
                  placement="top"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 500 }}
                >
                  {SliceName(titleize(props.data.title))}
                </Tooltip>
              ) : (
                <span>{SliceName(titleize(props.data.title))}</span>
              )}
              <div class="tag">
                <span class="arrow"></span>
                {props.data.section.title > 23 ? (
                  <Tooltip
                    arrow
                    title={props.title}
                    placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 500 }}
                  >
                    {SliceName(titleize(props.data.section.title))}
                  </Tooltip>
                ) : (
                  <span>{SliceName(titleize(props.data.section.title))}</span>
                )}
              </div>
            </div>

            <Typography variant="caption" style={{ lineHeight: 0 }}>
              {props.data.updated_by?.name ? (
                <>
                  Updated by:
                  <span style={{ color: "#9155FD", marginLeft: 5 }}>
                    {titleize(props.data.updated_by?.name)}
                  </span>
                </>
              ) : (
                <>
                  Created by:
                  <span style={{ color: "#9155FD", marginLeft: 5 }}>
                    {titleize(props.data.created_by?.name)}
                  </span>
                </>
              )}
            </Typography>
          </div>
          {/* <div
            style={{
              display: "flex",
              flex: "0.5",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>
              {
                <CustomChip
                  rounded
                  size="small"
                  skin="light"
                  color={StatusColor(props.moduleData.status)}
                  label={props.moduleData.status}
                />
              }
            </Typography>
            <Typography variant="caption">
              No.of test case:
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>10</span>
            </Typography>
          </div> */}
        </DialogTitle>

        <DialogContent>
          {/* {props.moduleData.description} */}
          {/* <TextInput
            fullWidth
            size={"small"}
            placeholder={"Enter your project name"}
            value={props.value.title ? props.value.title : props.value}
            onChange={(e) => props.setValue(e.target.value)}
          /> */}
          <Typography
            sx={{ fontWeight: 600, fontSize: "1rem", margin: "10px auto" }}
          >
            Test Case Description
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.87rem" }}>
            {props.data.description}
          </Typography>
          <Typography
            sx={{ fontWeight: 600, fontSize: "1rem", marginTop: "1rem" }}
          >
            Steps
          </Typography>

          <Timeline style={{ padding: 0 }}>
            {props.data.steps.map((step, index) => (
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
            sx={{ fontWeight: 600, fontSize: "1rem", margin: "10px auto" }}
          >
            Expected Result
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.87rem",
              margin: "10px auto",
            }}
          >
            {props.data.expected_result}
          </Typography>
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleClose}
          >
            Done
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default TestCaseDialogue;

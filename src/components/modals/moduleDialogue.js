import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { titleize } from "components/helper";
import Typography from "@mui/material/Typography";
import CustomChip from "@core/components/mui/chip";

const StatusColor = (value) => {
  const colors = {
    started: "primary",
    inprogress: "info",
    cancelled: "error",
    completed: "success",
  };

  return colors[value];
};

function ModuleDialogue(props) {
  return (
    <Dialog open={props.formOpen} onClose={props.handleClose}>
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
            {props.moduleData.title}
            <Typography variant="caption">
              {props.moduleData.updated_by?.name ? (
                <>
                  Updated by:{" "}
                  <span style={{ color: "#9155FD" }}>
                    {titleize(props.moduleData.updated_by?.name)}
                  </span>{" "}
                </>
              ) : (
                <>
                  Created by:{" "}
                  <span style={{ color: "#9155FD" }}>
                    {titleize(props.moduleData.created_by?.name)}
                  </span>
                </>
              )}{" "}
            </Typography>
          </div>
          <div
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
              No.of test case:{" "}
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>
                {props.moduleData.test_cases_count
                  ? props.moduleData.test_cases_count
                  : 0}
              </span>
            </Typography>
          </div>
        </DialogTitle>

        <DialogContent>{props.moduleData.description}</DialogContent>

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

export default ModuleDialogue;

import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextInput from "@core/components/input/textInput";

function CreateProject(props) {

  return (
    <Dialog open={props.formOpen} onClose={props.handleClose}>
      <div
        style={{
          boxShadow: " 3px 3px 18px rgba(145, 85, 253, 0.11)",
          borderRadius: "15px",
          minWidth: "600px",
        }}
      >
        <DialogTitle style={{ display: "flex", flexDirection: "column" }}>
          {props.formTitle}
          <span style={{ fontSize: "16px" }}>{props.formDescription}</span>
        </DialogTitle>

        <DialogContent>
          Project Name
          <TextInput
            fullWidth
            size={"small"}
            placeholder={"Enter your project name"}
            value={props.value.title ? props.value.title : props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => props.data.id ? props.handleUpdate(props.data.id) : props.handleSave}
          >
            {props.data.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default CreateProject;

import React from "react";
import Button from "@mui/material/Button";
import Icon from "@core/components/icon";
import { Divider } from "@mui/material";

function PageHeader(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{}}>
          <h3 style={{ margin: "5px 0" }}>{props.title}</h3>
          <span>{props.description}</span>
        </div>
        <div style={{}}>
          <Button size="small" variant="contained">
            <Icon icon="bx:plus" /> {props.buttonName}
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
}
export default PageHeader;

import React from "react";
import Button from "@mui/material/Button";
import Icon from "@core/components/icon";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
// import Typography from "@mui/material/Typography";

function PageHeader(props) {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: "5px 0" }}>{props.title}</h3>

        <Button
          style={{ padding: "10px " }}
          size="small"
          variant="contained"
          onClick={() =>
            props.setFormOpen
              ? props.setFormOpen(true)
              : router.replace(props.navigate)
          }
        >
          <Icon icon="bx:plus" />{" "}
          <span style={{ fontWeight: 600, marginLeft: 1,fontSize:"0.9rem" }}>
            {props.buttonName}
          </span>
        </Button>
      </div>
      <Divider />
    </>
  );
}
export default PageHeader;

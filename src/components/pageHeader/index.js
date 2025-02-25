import React from "react";
import Button from "@mui/material/Button";
import Icon from "@core/components/icon";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";

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
          size="small"
          variant="contained"
          onClick={() =>
            props.setFormOpen
              ? props.setFormOpen(true)
              : router.replace(props.navigate)
          }
        >
          <Icon icon="bx:plus" />
          <span style={{ fontWeight: 600, marginLeft: 1, fontSize: "0.9rem" }}>
            {props.buttonName}
          </span>
        </Button>
      </div>
      <div style={{ paddingTop: "0.5rem" }}>
        <Divider />
      </div>
    </>
  );
}

export default PageHeader;

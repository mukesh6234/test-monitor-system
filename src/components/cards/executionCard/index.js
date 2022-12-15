import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { titleize } from "components/helper";

function ExecutionCard(props) {
    console.log(props,"vvv");
  return (
    <Card style={{ padding: 10, display: "grid", gridAutoRows: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        //   alignItems: "center",
        padding:10
        }}
      >
        <div style={{ display: "flex", flex: 1,flexDirection: "column" }}>
          <Typography style={{ fontSize: "1rem" }}>{props.title}</Typography>
          <Typography variant="caption">
            {/* {props.updated_by ? (
                <>
                  Updated by:
                  <span style={{ color: "#9155FD" ,marginLeft: 5}}>
                    {titleize(props.updated_by?.name)}
                  </span>
                </>
              ) : (
                <> */}
            Created by:
            <span style={{ color: "#9155FD", marginLeft: 5 }}>
              {titleize("Mukesh")}
            </span>
            {/* </>
              )} */}
          </Typography>
        </div>
        <div style={{ display: "flex", flex: 1,justifyContent:"flex-end" }}>
          <Typography variant="caption">{props.test_cases_count} Test Case</Typography>
        </div>
        <div style={{ display: "flex", flex: 1,justifyContent:"flex-end" }}>
          <Typography variant="caption">{props?.created_at}</Typography>
        </div>
        <div style={{ display: "flex", flex: 1,justifyContent:"flex-end" }}>
          <Typography variant="caption">10 Pass</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        //   alignItems: "center",
        padding:10
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Typography style={{ fontSize: "1rem",fontWeight:600 }}>Description</Typography>
          <span style={{ display: "block" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </span>
        </div>
        <div style={{ display: "flex", flex: 1,justifyContent:"center",alignItems:"center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </div>
      </div>
    </Card>
  );
}
export default ExecutionCard;

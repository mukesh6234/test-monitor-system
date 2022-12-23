import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { titleize } from "components/helper";
import Icon from "@core/components/icon";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";

function ExecutionCard({ projectId, execution, ...props }) {
  const router = useRouter();
  const passPercentage = props.test_cases_count
    ? props.sections_data.pass / props.test_cases_count
    : props.test_cases_count * 100;

  // let testingProgress = [
  //   {
  //     name: "Fail",
  //     value: 60,
  //     color: "#eb4d4b",
  //   },
  //   {
  //     name: "Skipped",
  //     value: 7,
  //     color: "#22a6b3",
  //   },
  //   {
  //     name: "Pass",
  //     value: 23,
  //     color: "#6ab04c",
  //   },
  // ];

  return (
    <Card
      style={{
        padding: 10,
        display: "grid",
        gridAutoRows: "auto",
        gap: "50px !important",
      }}
      onClick={() =>
        router.push(
          `/projects/${projectId}/testplans/testrun/${execution[0]}/${props.id}`
        )
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   alignItems: "center",
          padding: 10,
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Typography style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {titleize(props.title)}
          </Typography>
          <Typography variant="caption">
            {props.updated_by ? (
              <>
                Updated by:
                <span style={{ color: "#9155FD", marginLeft: 5 }}>
                  {titleize(props.updated_by?.name)}
                </span>
              </>
            ) : (
              <>
                Created by:
                <span style={{ color: "#9155FD", marginLeft: 5 }}>
                  {titleize("Mukesh")}
                </span>
              </>
            )}
          </Typography>
        </div>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <Typography>{props.test_cases_count} Test Cases</Typography>
        </div>
        {/* <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <Typography >{props?.created_at}</Typography>
        </div> */}
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <span style={{ marginRight: 5, color: "#6AB14B", fontWeight: 600 }}>
            {" "}
            {passPercentage}%
          </span>
          <Typography>Pass</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   alignItems: "center",
          padding: 10,
          gap: 10,
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Typography
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: 5 }}>
              {" "}
              <Icon icon="bx:spreadsheet" fontSize={20} />
            </span>{" "}
            Description
          </Typography>
          <span style={{ display: "block" }}>{props.description}</span>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div className="multicolor-bar">
            <div className="values">{values == "" ? "" : values}</div>
            <div className="scale">
              {calibrations == "" ? "" : calibrations}
            </div>
            <div className="bars">{bars == "" ? "" : bars}</div>
            <div className="legends">{legends == "" ? "" : legends}</div>
          </div> */}
          {/* <div
            style={{
              border: "1px solid #EEEEEE",
              borderRadius: 10,
              height: 15,
              width: "100%",
              background: "#EEEEEE",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: "100px",
              }}
            >
              {" "}
              <span
                style={{
                  borderRadius: 10,
                  position: "absolute",
                  background: "green",
                  height: "100%",
                  width: "100px",
                  display: "inline-block",
                }}
              ></span>
              <span />
              <span />
            </div>
          </div> */}
        </div>
      </div>
    </Card>
  );
}
export default ExecutionCard;

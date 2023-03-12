import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { titleize } from "components/helper";
import Icon from "@core/components/icon";
import { useRouter } from "next/router";
import MuiSlider from "@mui/material/Slider";
import { hexToRGBA } from "@core/utils/hex-to-rgba";
import { useTheme, styled } from "@mui/material/styles";

const progressColor = (value) => {
  switch (true) {
    case value >= 80:
      return "#339900";

    case value >= 60 && value < 80:
      return "#99cc33";

    case value >= 40 && value < 60:
      return "#ffcc00";

    case value >= 20 && value < 40:
      return "	#cc3300";

    default:
      return "#cc3300";
  }
};

const Slider = styled(MuiSlider)(({ theme }) => ({
  padding: "0",
  height: "15px !important",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    display: "none",
  },
}));

function ExecutionCard({ projectId, testPlanId, ...props }) {
  const router = useRouter();
  const theme = useTheme();
  const passPercentage = props.test_cases_count
    ? Math.floor((props.section_data.pass / props.test_cases_count) * 100)
    : props.test_cases_count * 100;

  return (
    <Card
      style={{
        padding: 10,
        display: "grid",
        gridAutoRows: "auto",
        gap: "50px !important",
        cursor: "pointer",
      }}
      onClick={() =>
        router.push(
          `/projects/${projectId}/testplans/${testPlanId}/${props.id}/testrun`
        )
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
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
          <span style={{ marginRight: 5 }}>
            <Icon icon="bx-archive" fontSize={20} />
          </span>{" "}
          <Typography> Test Cases {props.test_cases_count}</Typography>
        </div>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <span
            style={{
              marginRight: 5,
              color: progressColor(passPercentage),
              fontWeight: 600,
            }}
          >
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
            Module Description
          </Typography>
          <span style={{ display: "block" }}>{props.description}</span>
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Slider
            sx={{
              color: hexToRGBA(progressColor(passPercentage, theme), 1),
              height: "12px !important",
              pointerEvents: "none",
            }}
            value={passPercentage}
          />
        </div>
      </div>
    </Card>
  );
}
export default ExecutionCard;

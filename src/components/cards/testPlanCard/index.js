import React from "react";
import { SliceName, titleize } from "components/helper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Icon from "@core/components/icon";
import CustomChip from "@core/components/mui/chip";
import { Tooltip, Zoom } from "@mui/material";
import Image from "next/image";
import bundleIcon from "../../../../public/images/pages/layer.png";
import testRunIcon from "../../../../public/images/pages/test-run.png";

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    borderRight: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

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

function TestPlanCard(props) {
  const router = useRouter();

  return (
    <Card style={{ padding: 25, paddingBottom: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {props.title.length > 23 ? (
            <Tooltip
              arrow
              title={props.title}
              placement="top"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 500 }}
            >
              <Typography style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                {SliceName(titleize(props.title))}
              </Typography>
            </Tooltip>
          ) : (
            <Typography style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              {SliceName(titleize(props.title))}
            </Typography>
          )}
          <Typography variant="caption">
            {props.updated_by?.name ? (
              <>
                Updated by:
                <span style={{ color: "#9155FD", marginLeft: 5 }}>
                  {titleize(props.updated_by?.name)}
                </span>
              </>
            ) : (
              <>
                Created by:
                <span style={{ color: "#9155FD" }}>
                  {titleize(props.created_by?.name)}
                </span>
              </>
            )}
          </Typography>
        </div>
        <div
          onClick={() => props.handleEdit(props.id)}
          style={{ cursor: "pointer" }}
        >
          <StyledLink>
            <Icon icon="bx-edit" fontSize={20} />
          </StyledLink>
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px auto",
        }}
      >
        <div>
          <Typography sx={{ fontWeight: 500 }} variant="h6">
            {props.no_of_sections}
          </Typography>

          <Typography sx={{ fontWeight: 500 }}>No. of module</Typography>
        </div>
        <div>
          <Typography sx={{ fontWeight: 500 }} variant="h6">
            <span style={{ padding: "0 5px" }}>{props.passed_test_cases}</span>
            {"/"}
            <span style={{ padding: "0 5px" }}>{props.test_cases}</span>
          </Typography>

          <Typography sx={{ fontWeight: 500 }}>No. of Passed</Typography>
        </div>
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px auto 10px auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Image src={bundleIcon} height={30} alt="test-case-logo" /> */}
          <div style={{ marginLeft: 10 }}>
            <Typography sx={{ fontWeight: 600, lineHeight: 1 }} variant="h5">
              <Icon icon="bxs-data" fontSize={20} /> {/* </div>{" "} */}
              {props.no_of_sections}
            </Typography>

            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              Modules
            </Typography>
          </div>
        </div>

        {/* <Image src={testRunIcon} height={30} alt="test-case-logo" /> */}

        <div style={{ marginLeft: 10 }}>
          <Typography
            sx={{
              fontWeight: 600,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            variant="h5"
          >
            <Icon icon="bx-check-shield" fontSize={20} />
            <span style={{ padding: "0 5px" }}>{props.passed_test_cases}</span>
            {"/"}
            <span style={{ padding: "0 5px" }}>{props.test_cases}</span>
          </Typography>
          {/* <div> */}
          <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Passed Cases
          </Typography>
          {/* </div> */}
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <div
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
          }}
          onClick={() =>
            router.push(
              `/projects/${props.projectId}/testplans/execution/${props.id}`
            )
          }
        >
          <StyledLink>
            <span style={{ marginRight: 5 }}>
              <Icon icon="bx-test-tube" fontSize={20} />
            </span>
            Execution
          </StyledLink>
        </div>
        <Divider flexItem />
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
            cursor: "pointer",
          }}
          //   onClick={() => props.handleView(props.id)}
          onClick={() =>
            router.push(
              `/projects/${props.projectId}/testplans/report/${props.id}`
            )
          }
        >
          <StyledLink>
            <span style={{ marginRight: 5 }}>
              <Icon icon="bxs-report" fontSize={20} />
            </span>
            Report
          </StyledLink>
        </div>
      </div>
    </Card>
  );
}

export default TestPlanCard;

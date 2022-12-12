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
    <Card style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Tooltip
            arrow
            title={"Test Plan"}
            placement="top"
            TransitionComponent={Zoom}
            followCursor
          >
            <Typography variant="h6">
              {SliceName(titleize("Test Plan"))}
            </Typography>
          </Tooltip>
          <Typography variant="caption">
            {props.updated_by?.name ? (
              <>
                Updated by:
                <span style={{ color: "#9155FD" }}>
                  {titleize(props.updated_by?.name)}
                </span>
              </>
            ) : (
              <>
                Created by:
                <span style={{ color: "#9155FD" }}>
                  {titleize("Test Plan")}
                </span>
              </>
            )}
          </Typography>
        </div>
       <div   onClick={() => router.push(`/project/testplan/edittestplan`)} style={{cursor:"pointer"}}>  <StyledLink><Icon icon="bx-edit"  fontSize={20} /></StyledLink></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px auto",
        }}
      >
        <div>
          <Typography sx={{ fontWeight: 500 }} variant="h6">
            
            {9}
          </Typography>

          <Typography sx={{ fontWeight: 500 }}>No. of module</Typography>
        </div>
        <div>
            <Typography sx={{ fontWeight: 500 }} variant="h6">
              
              {5}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>No. of Passed</Typography>
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
          }}
        >
          <StyledLink>
            <span style={{ marginRight: 5, }}>
              
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
            padding: 5,
            cursor: "pointer",
          }}
        //   onClick={() => props.handleView(props.id)}
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

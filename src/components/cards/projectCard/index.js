import React from "react";
import moment from "moment";
import { SliceName, titleize } from "components/helper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import Icon from "@core/components/icon";

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

function ProjectCard(props) {
  return (
    <Card style={{ padding: 10, display: "grid", gridAutoRows: "auto" }}>
      <div
        onClick={() => props.handleEdit(props.id)}
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <Tooltip
              arrow
              title={props.title}
              placement="top"
              TransitionComponent={Zoom}
              followCursor
            >
              <Typography style={{ fontSize: "1rem" }}>
                {SliceName(titleize(props.title))}
              </Typography>
            </Tooltip>
            <Typography variant="caption">
              {props.updated_by ? (
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
                    {titleize(props.created_by?.name)}
                  </span>
                </>
              )}
            </Typography>
          </div>
          <Typography sx={{ fontWeight: 500 }}>
            {moment(props.created_at).format("ll")}
          </Typography>
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
              
              {props.test_cases_count}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Test Cases</Typography>
          </div>
          <div>
            <Typography sx={{ fontWeight: 500 }} variant="h6">
              
              {props.test_plans_count}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Test Runs</Typography>
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <Link
          href={`/projects/${props.id}/modules`}
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <StyledLink>
            <span style={{ marginRight: 5 }}>
              <Icon icon="la:cubes" fontSize={24} />
            </span>
            Modules
          </StyledLink>
        </Link>
        <Divider flexItem />
        <Link
          href={`/projects/${props.id}/testcases`}
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <StyledLink>
            <span style={{ marginRight: 5, textAlign: "center" }}>
              <Icon icon="material-symbols:fact-check-outline" fontSize={24} />
            </span>
            Test Cases
          </StyledLink>
        </Link>
      </div>
    </Card>
  );
}

export default ProjectCard;

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
import { setCookie } from "cookies-next";
import bundleIcon from "../../../../public/images/pages/layer.png";
import testRunIcon from "../../../../public/images/pages/test-run.png";
import Image from "next/image";

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
    <Card
      style={{
        padding: 25,
        paddingBottom: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gridAutoRows: "auto",
        gridTemplateRows: "auto",
      }}
    >
      <div
        onClick={() => props.handleEdit(props.id)}
        style={{ cursor: "pointer" }}
      >
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        > */}

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
        {/* </div> */}
      

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px auto 10px auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={bundleIcon} height={30} alt="test-case-logo" />
            <div style={{ marginLeft: 10 }}>
              <Typography sx={{ fontWeight: 600, lineHeight: 1 }} variant="h6">
                {props.sections_count}
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Modules
              </Typography>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={testRunIcon} height={30} alt="test-case-logo" />
            <div style={{ marginLeft: 10 }}>
              <Typography sx={{ fontWeight: 600, lineHeight: 1 }} variant="h6">
                {props.test_cases_count}
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Test Cases
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <Link
          href={`/projects/${props.id}/modules`}
          onClick={() => {
            setCookie("project-title", props.title);
          }}
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
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
          onClick={() => {
            setCookie("project-title", props.title);
          }}
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
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

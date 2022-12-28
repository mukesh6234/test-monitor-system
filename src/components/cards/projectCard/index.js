import React from "react";
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
  cursor: "pointer",
  flexDirection: "column",
  textDecoration: "none",
  fontSize: "0.80rem",
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
        // overflow: "hidden",
        padding: 25,
        // paddingBottom: 0,
        // display: "grid",
        // gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        // gridAutoRows: "auto",
        // gridTemplateRows: "auto",
        position: "relative",
      }}
      className="project-card"
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px auto 10px auto",
          }}
        >
          <Link
            href={`/projects/${props.id}/modules`}
            onClick={() => {
              setCookie("project-title", props.title);
            }}
            style={{
              textDecoration: "none",
              width: "40%",
            }}
          >
            <StyledLink>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {/* <Image src={bundleIcon} height={30} alt="test-case-logo" /> */}
                <div style={{ marginLeft: 10 }}>
                  <Typography
                    sx={{ fontWeight: 500, lineHeight: 1 }}
                    variant="h5"
                  >
                    <Icon icon="bxs-data" fontSize={20} /> {/* </div>{" "} */}
                    {props.sections_count}
                  </Typography>
                  Modules
                </div>
              </div>
            </StyledLink>
          </Link>
          <Link
            href={`/projects/${props.id}/testcases`}
            onClick={() => {
              setCookie("project-title", props.title);
            }}
            style={{
              textDecoration: "none",
              width: "40%",
            }}
          >
            <StyledLink>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "flex-end",
                }}
              >
                {/* <Image src={testRunIcon} height={30} alt="test-case-logo" /> */}

                <div style={{ marginLeft: 10 }}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                    variant="h5"
                  >
                    <Icon icon="bx-archive" fontSize={20} /> {/* </div>{" "} */}
                    {props.test_cases_count}
                  </Typography>
                  Test Cases
                </div>
              </div>
            </StyledLink>
          </Link>
        </div>
        <div className="edit-btn" onClick={() => props.handleEdit(props.id)}>
          {" "}
          <StyledLink>
            {" "}
            <Icon icon="bx-edit" fontSize={20} />
          </StyledLink>
        </div>
      </div>
      {/* <Divider /> */}
      {/* <div style={{ display: "flex" }}>
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
            <span style={{ marginRight: 5, marginTop: 5 }}>
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
            <span style={{ marginRight: 5, marginTop: 5 }}>
              <Icon icon="material-symbols:fact-check-outline" fontSize={24} />
            </span>
            Test Cases
          </StyledLink>
        </Link>
      </div> */}
    </Card>
  );
}

export default ProjectCard;

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
import testRunIcon from "../../../../public/images/pages/test-run.png";

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    borderRight: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const StatusColor = (value) => {
  const colors = {
    draft: "info",
    rejected: "error",
    completed: "success",
  };

  return colors[value];
};

const StyledLink = styled("a")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  // alignItems: "center",
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

function ModuleCard(props) {
  const router = useRouter();

  return (
    <Card
      style={{ padding: 25, paddingBottom: 0, position: "relative" }}
      className="project-card"
    >
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
        }}
      >
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
              <span style={{ color: "#9155FD", marginLeft: 5 }}>
                {titleize(props.created_by?.name)}
              </span>
            </>
          )}
        </Typography>
        <Typography sx={{ fontWeight: 500 }}>
          {
            <CustomChip
              rounded
              size="small"
              skin="light"
              color={StatusColor(props.status)}
              label={props.status}
            />
          }
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
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Image src={testRunIcon} height={30} alt="test-case-logo" /> */}

          <div style={{ marginLeft: 10 }}>
            <StyledLink>
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
                {/* <div style={{marginTop:15}}> */}
                <Icon icon="bx-archive" fontSize={20} /> {/* </div>{" "} */}
                {props.test_cases_count}
              </Typography>

              <Typography variant="caption">Test Cases</Typography>
            </StyledLink>
          </div>
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
        <div
          onClick={() => props.handleEdit(props.id)}
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
              <Icon icon="bx:pencil" fontSize={20} />
            </span>
            Edit
          </StyledLink>
        </div>
        <Divider flexItem />
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: "10px 0",
          }}
          onClick={() => props.handleView(props.id)}
        >
          <StyledLink>
            <span style={{ marginRight: 5, marginTop: 5 }}>
              <Icon icon="bx-show" fontSize={20} />
            </span>
            View
          </StyledLink>
        </div>
      </div> */}
    </Card>
  );
}

export default ModuleCard;

import React from "react";
import { SliceName, titleize } from "components/helper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
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
  //   flexDirection: "column",
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

function TestCaseCard(props) {
  const router = useRouter();

  return (
    <Card style={{ padding: 25, paddingBottom: 0 }} className="project-card">
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
        {/* <Typography sx={{ fontWeight: 500 }}>
          {
            <CustomChip
              rounded
              size="small"
              skin="light"
              color={StatusColor(props.status)}
              label={props.status}
            />
          }
        </Typography> */}
      </div>
      <div
        style={{
          //   display: "flex",
          //   justifyContent: "space-between",
          //   alignItems: "center",
          margin: "20px auto",
        }}
        className="girdCard"
      >
        <Typography variant="body2">{props.description}</Typography>
      </div>
      {/* <div
        className="edit-btn"
        onClick={() =>
          router.push(
            `/projects/${props.projectId}/testcases/${props.id}/edittestcase`
          )
        }
      >
        {" "}
        <StyledLink>
          {" "}
          <Icon icon="bx-edit" fontSize={20} />
        </StyledLink>
      </div> */}
      <Divider />
      <div style={{ display: "flex" }}>
        {/* <div class="tag">{SliceName("Young Adult Fiction20px uygu ygu u ygu u hgfhgfh")}</div> */}
        {/* <div class="tag">
          <span class="arrow"></span>
          Experiments
        </div> */}
        <div
          onClick={() =>
            router.push(
              `/projects/${props.projectId}/testcases/${props.id}/edittestcase`
            )
          }
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
      </div>
    </Card>
  );
}

export default TestCaseCard;

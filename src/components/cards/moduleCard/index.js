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

const StatusColor = (value) => {
  const colors = {
    started: "primary",
    inprogress: "info",
    cancelled: "error",
    completed: "success",
  };

  return colors[value];
};

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

function ModuleCard(props) {
  const router = useRouter();

  return (
    <Card style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Tooltip
            arrow
            title={props.title}
            placement="top"
            TransitionComponent={Zoom}
            followCursor
          >
            <Typography variant="h6">
              {SliceName(titleize(props.title))}
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
                  {titleize(props.created_by?.name)}
                </span>
              </>
            )}
          </Typography>
        </div>
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
        <div>
          <Typography sx={{ fontWeight: 500 }} variant="h6">
            
            {props.test_cases_count}
          </Typography>

          <Typography sx={{ fontWeight: 500 }}>Test Cases</Typography>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <Link
          href={`/project/modules/editmodule/${props.projectId}/${props.id}`}
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
              
              <Icon icon="bx:pencil" fontSize={20} />
            </span>
            Edit
          </StyledLink>
        </Link>
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
          onClick={() => props.handleView(props.id)}
        >
          <StyledLink>
            <span style={{ marginRight: 5 }}>
              <Icon icon="bx:show" fontSize={20} />
            </span>
            View
          </StyledLink>
        </div>
      </div>
    </Card>
  );
}

export default ModuleCard;

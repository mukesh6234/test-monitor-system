import React from "react";
// import Icon from "@core/components/icon";
import { titleize } from "components/helper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Box from "@mui/material/Box";
import CustomAvatar from "@core/components/mui/avatar";
import CustomChip from "@core/components/mui/chip";
import Icon from "@core/components/icon";
import { getInitials } from "@core/utils/get-initials";

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
    active: "success",
    inactive: "error",
  };

  return colors[value];
};
const RoleColor = (value) => {
  const colors = {
    "Super Admin": "primary",
    Admin: "info",
    Tester: "secondary",
    Developer: "error",
  };

  return colors[value];
};
const renderIcon = (props) => {
  //   if (props.name.image .length) {
  //     return (
  //       <CustomAvatar src={props.name.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  //     );
  //   } else {
  return (
    <CustomAvatar
      skin="light"
      color={"primary"}
      sx={{
        mr: 3,
        width: 60,
        height: 60,
        fontSize: "1.5rem",
        fontWeight: "semi-bold",
      }}
    >
      {titleize(getInitials(props.name))}
    </CustomAvatar>
  );
  //   }
};

function UserCard(props) {
  console.log(props, "bbbbb");
  const router = useRouter();
  return (
    <Card style={{ padding: 10 }}>
      {/* <div className="card-layout"> */}
      {/* <div onClick={() =>router.push("/")}> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => router.push(`user/edituser/${props.id}`)}
      >
        {/* <div>
          <Typography variant="h6">{titleize(props.name)}</Typography>
          <Typography variant="caption">
            {props.updated_by?.name ? (
              <>
                Updated by:{" "}
                <span style={{ color: "#9155FD" }}>
                  {titleize(props.updated_by?.name)}
                </span>{" "}
              </>
            ) : (
              <>
                Created by:{" "}
                <span style={{ color: "#9155FD" }}>
                  {titleize(props.created_by?.name)}
                </span>
              </>
            )}{" "}
          </Typography>
          <Typography variant="caption">{props.email}</Typography>
          <Typography variant="caption"><Icon fontSize={20} icon='bx:star' />{props.email}  </Typography>
        </div> */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderIcon(props)}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography style={{ fontSize: "0.89rem" }}>
              {titleize(props.name)}
            </Typography>
            <Typography
              noWrap
              variant="caption"
              sx={{ color: "text.disabled" }}
            >
              {props.email}
            </Typography>
            <Typography variant="caption">
              {/* <Icon fontSize={20} icon="bx:star" />{" "} */}
              <CustomChip
                rounded
                size="small"
                skin="light"
                color={RoleColor(props.role_group.name)}
                label={props.role_group.name}
              />{" "}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 500 }}>
          {
            <CustomChip
              rounded
              size={"0.75rem"}
              skin="light"
              color={StatusColor("active")}
              label={"active"}
            />
          }
        </Typography>
      </div>
    </Card>
  );
}
export default UserCard;

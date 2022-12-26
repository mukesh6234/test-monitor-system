import React from "react";
import { titleize } from "components/helper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import CustomAvatar from "@core/components/mui/avatar";
import CustomChip from "@core/components/mui/chip";
import { getInitials } from "@core/utils/get-initials";
import testerImage from "../../../../public/images/pages/tester.png";
import adminImage from "../../../../public/images/pages/admin.png";
import developerImage from "../../../../public/images/pages/developer.png";
import Image from "next/image";
import Icon from "@core/components/icon";

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
    Tester: "info",
    Developer: "warning",
  };

  return colors[value];
};

const renderIcon = (props) => {
  return (
    <>
      {props.image_path ? (
        <Image
          src={props.image_path}
          alt="Role Image"
          height={70}
          width={70}
          style={{ marginRight: 10 }}
        />
      ) : (
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
      )}
    </>
  );
};

function UserCard(props) {
  const router = useRouter();

  return (
    <Card style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          cursor: "pointer",
          padding: 5,
          position:"relative"
        }}
        onClick={() => props.handleEdit(props.id)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderIcon(props)}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
        <div style={{ display: "flex" }}>
          <span
            style={{
              // backgroundColor: "rgba(105, 108, 255, 0.16)",
              // height: 42,
              // width: 42,
              marginRight: 10,
              // marginTop: 5,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              // padding: 5,
              borderRadius: 5,
            }}
          >
            {" "}
            <Icon icon="bx:user"  fontSize={20} />{" "}
          </span>
          <Typography variant="h6">{titleize(props.name)}</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              // backgroundColor: "rgba(105, 108, 255, 0.16)",
              // height: 42,
              // width: 42,
              marginRight: 10,
              // marginTop: 5,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              // padding: 5,
              borderRadius: 5,
            }}
          >
            {" "}
            <Icon icon="bx:envelope"  fontSize={20} />{" "}
          </span>
          <Typography variant="body2">{props.email}</Typography>
        </div>
        <div style={{ display: "flex"}}>
          <span
            style={{
              // backgroundColor: "rgba(105, 108, 255, 0.16)",
              // height: 42,
              // width: 42,
              marginRight: 10,
              marginTop: 5,
              display: "inline",
              // alignItems: "center",
              // justifyContent: "center",
              // padding: 5,
              borderRadius: 5,
            }}
          >
            {" "}
            <Icon icon="bx:star"  fontSize={20} />{" "}
            </span>
          <Typography variant="caption" marginTop={1}>
            <CustomChip
              rounded
              size="small"
              skin="light"
              color={RoleColor(props.role_group.name)}
              label={props.role_group.name}
            />
          </Typography>

        </div>
        <div style={{position:"absolute",top:0,right:0}}>
          {
            <CustomChip
              rounded
              size={"0.75rem"}
              skin="light"
              color={StatusColor(props.status)}
              label={props.status}
            />
          }
        </div>
        </Box>
      </div>
    </Card>
  );
}

export default UserCard;

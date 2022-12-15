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
    Developer: "success",
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
          height={60}
          width={60}
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
          justifyContent: "space-between",
          cursor: "pointer",
          padding: 5,
        }}
        onClick={() => router.push(`users/edituser/${props.id}`)}
      >
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
              <CustomChip
                rounded
                size="small"
                skin="light"
                color={RoleColor(props.role_group.name)}
                label={props.role_group.name}
              />
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 500 }}>
          {
            <CustomChip
              rounded
              size={"0.75rem"}
              skin="light"
              color={StatusColor(props.status)}
              label={props.status}
            />
          }
        </Typography>
      </div>
    </Card>
  );
}

export default UserCard;

// ** React Imports
import { useState, Fragment } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useAuth } from "hooks/useAuth";

// ** Icon Imports
import Icon from "../../../components/icon";
import { titleize } from "components/helper";
import Image from "next/image";
import testerImage from "../../../../../public/images/pages/tester.png";
import adminImage from "../../../../../public/images/pages/admin.png";
import developerImage from "../../../../../public/images/pages/developer.png";
import CustomAvatar from "@core/components/mui/avatar";

// ** Context

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = (props) => {
  // ** Props
  const { settings } = props;

  // ** States
  const [anchorEl, setAnchorEl] = useState(null);

  // ** Hooks
  const router = useRouter();
  const { direction } = settings;
  const { logout } = useAuth();
  const auth = useAuth();
  let user = auth.user;

  // ** Vars

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const renderIcon = (props) => {
    return (
      <>
        {props.image_path ? (
          <Image
            src={props.image_path}
            alt="Role Image"
            height={40}
            width={40}
          />
        ) : (
          <CustomAvatar
            skin="light"
            color={"primary"}
            sx={{
              width: 40,
              height: 40,
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

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.secondary",
    textDecoration: "none",
    "& svg": {
      mr: 2,
      fontSize: "1.25rem",
      color: "text.secondary",
    },
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {renderIcon(user)}
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ py: 2, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {renderIcon(user)}
            </Badge>
            <Box
              sx={{
                ml: 3,
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {titleize(user.name)}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user.role_group.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: "0 !important" }} />
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/users/profile")}
        >
          <Box sx={styles}>
            <Icon icon="bx:user" />
            Profile
          </Box>
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            px: 4,
            color: "text.secondary",
            "& svg": { mr: 2, fontSize: "1.25rem", color: "text.secondary" },
          }}
        >
          <Icon icon="bx:power-off" />
          Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;

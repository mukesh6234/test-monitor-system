// ** Next Import
import Link from "next/link";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Custom Icon Import
import Icon from "../../../../components/icon";

// ** Configs
import themeConfig from "../../../../../configs/themeConfig";
import katoIcon from "../../../../../../public/images/pages/kato-icon.png";
import Image from "next/image";

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  marginTop: theme.spacing(3),
  paddingRight: theme.spacing(5),
  justifyContent: "space-between",
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const StyledLink = styled("a")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
});

const VerticalNavHeader = (props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon,
  } = props;

  // ** Hooks & Vars
  const theme = useTheme();
  const { mode, skin, direction, navCollapsed } = settings;
  
  const menuCollapsedStyles =
    navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const handleButtonClick = () => {
    if (hidden) {
      toggleNavVisibility();
    } else {
      saveSettings({ ...settings, navCollapsed: !navCollapsed });
    }
  };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 22) / 8;
      }
    } else {
      return 8;
    }
  };

  const svgRotationDeg = () => {
    if (navCollapsed) {
      if (direction === "rtl") {
        if (navHover) {
          return 0;
        } else {
          return 180;
        }
      } else {
        if (navHover) {
          return 180;
        } else {
          return 0;
        }
      }
    } else {
      if (direction === "rtl") {
        return 180;
      } else {
        return 0;
      }
    }
  };

  return (
    <MenuHeaderWrapper
      className="nav-header"
      sx={{ pl: menuHeaderPaddingLeft() }}
    >
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <StyledLink>
            <Image src={katoIcon} height={32} alt="kato-logo" />
            <Typography
              variant="h5"
              sx={{
                lineHeight: 1,
                fontWeight: 700,
                ...menuCollapsedStyles,
                letterSpacing: "-0.45px",
                fontSize: "1.5rem !important",
                ...(navCollapsed && !navHover ? {} : { ml: 2 }),
                transition: "opacity .35s ease-in-out, margin .35s ease-in-out",
                ...(mode === "semi-dark" && {
                  color: `rgba(${theme.palette.customColors.dark}, 0.87)`,
                }),
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </StyledLink>
        </Link>
      )}

      {userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={handleButtonClick}
          sx={{
            p: 1.75,
            right: -19,
            position: "absolute",
            color: "text.primary",
            "& svg": { color: "common.white" },
            transition: "right .25s ease-in-out",
            backgroundColor: hidden
              ? mode === "semi-dark"
                ? theme.palette.customColors.darkPaperBg
                : "background.paper"
              : "background.default",
            ...(navCollapsed && !navHover && { display: "none" }),
            ...(!hidden &&
              skin === "bordered" && {
                "&:before": {
                  zIndex: -1,
                  content: '""',
                  width: "105%",
                  height: "105%",
                  borderRadius: "50%",
                  position: "absolute",
                  border: `1px solid ${theme.palette.divider}`,
                  clipPath:
                    direction === "rtl"
                      ? "circle(71% at 100% 50%)"
                      : "circle(71% at 0% 50%)",
                },
              }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: 5,
              backgroundColor: "primary.main",
            }}
          >
            {userMenuLockedIcon && userMenuUnlockedIcon ? (
              navCollapsed ? (
                userMenuUnlockedIcon
              ) : (
                userMenuLockedIcon
              )
            ) : (
              <Box
                sx={{
                  display: "flex",
                  "& svg": {
                    transform: `rotate(${svgRotationDeg()}deg)`,
                    transition: "transform .25s ease-in-out .35s",
                  },
                }}
              >
                <Icon icon="bx:chevron-left" />
              </Box>
            )}
          </Box>
        </IconButton>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;

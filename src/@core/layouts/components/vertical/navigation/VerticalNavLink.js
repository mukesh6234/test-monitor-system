// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";

// ** Configs Import
import themeConfig from "../../../../../configs/themeConfig";

// ** Custom Components Imports
import UserIcon from "../../../../../layouts/components/UserIcon";
import Translations from "../../../../../layouts/components/Translations";
import CanViewNavLink from "../../../../../layouts/components/acl/CanViewNavLink";

// ** Hook Import
import useBgColor from "../../../../hooks/useBgColor";

// ** Util Import
import { hexToRGBA } from "../../../../utils/hex-to-rgba";
import { handleURLQueries } from "../../../utils";

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(0, 4),
  transition: "padding .25s ease-in-out",
  borderRadius: theme.shape.borderRadius,
}));

const MenuItemTextMetaWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  ...(themeConfig.menuTextTruncate && { overflow: "hidden" }),
});

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth,
}) => {
  // ** Hooks
  const theme = useTheme();
  const router = useRouter();
  const bgColors = useBgColor();

  // ** Vars
  const { mode, navCollapsed } = settings;
  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  const conditionalBgColor = () => {
    if (mode === "semi-dark") {
      return {
        "&:hover": {
          backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.04)`,
        },
        "&.Mui-focusVisible": {
          backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.12)`,
        },
      };
    } else return {};
  };

  const isNavLinkActive = () => {
    console.log(
      router.pathname === item.path,
      // handleURLQueries(router, item.path),
      "hhhhhhhhh",
      item.path[1],
      router.pathname,
      handleURLQueries(router, item.path)
    );
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CanViewNavLink navLink={item}>
      <ListItem
        className="nav-link"
        disabled={item.disabled || false}
        sx={{
          px: "0 !important",
          ...(!parent && {
            mt: 0.5,
            ...(isNavLinkActive() && {
              "&:before": {
                right: 0,
                width: 4,
                height: 42,
                content: '""',
                position: "absolute",
                backgroundColor: "primary.main",
                borderTopLeftRadius: theme.shape.borderRadius,
                borderBottomLeftRadius: theme.shape.borderRadius,
              },
            }),
          }),
        }}
      >
        <Link
          passHref
          href={item.path === undefined ? "/" : `${item.path}`}
          style={{ textDecoration: "none", width: "220px" }}
        >
          <MenuNavLink
            component={"a"}
            {...(item.disabled && { tabIndex: -1 })}
            className={isNavLinkActive() ? "active" : ""}
            {...(item.openInNewTab ? { target: "_blank" } : null)}
            onClick={(e) => {
              if (item.path === undefined) {
                e.preventDefault();
                e.stopPropagation();
              }
              if (navVisible) {
                toggleNavVisibility();
              }
            }}
            sx={{
              py: 2.5,
              ...conditionalBgColor(),
              ...(item.disabled
                ? { pointerEvents: "none" }
                : { cursor: "pointer" }),
              pr:
                navCollapsed && !navHover
                  ? ((collapsedNavWidth - navigationBorderWidth - 22) / 4 - 8) /
                    2
                  : 4,
              pl:
                navCollapsed && !navHover
                  ? ((collapsedNavWidth - navigationBorderWidth - 22) / 4 - 8) /
                    2
                  : parent
                  ? 6
                  : 4,
              ...(parent
                ? {
                    "&.active": {
                      "& .MuiTypography-root": {
                        fontWeight: 600,
                        color:
                          mode === "semi-dark"
                            ? `rgba(${theme.palette.customColors.dark}, 0.87)`
                            : "text.primary",
                      },
                      "& svg": {
                        color: "primary.main",
                        transform: "scale(1.35)",
                        filter: `drop-shadow(0 0 2px ${theme.palette.primary.main})`,
                      },
                    },
                  }
                : {
                    "&.active": {
                      backgroundColor:
                        mode === "light"
                          ? bgColors.primaryLight.backgroundColor
                          : "primary.main",
                      "& .MuiTypography-root, & svg": {
                        color:
                          mode === "light" ? "primary.main" : "common.white",
                      },
                      "&.active.Mui-focusVisible": {
                        "&, &:hover": {
                          backgroundColor:
                            mode === "light"
                              ? hexToRGBA(theme.palette.primary.main, 0.24)
                              : "primary.dark",
                        },
                      },
                    },
                  }),
            }}
          >
            <ListItemIcon
              sx={{
                transition: "margin .25s ease-in-out",
                "& svg": { transition: "transform .25s ease-in-out" },
                ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2.5 }),
                ...(parent
                  ? {
                      mr: 4.25,
                      color:
                        mode === "semi-dark"
                          ? `rgba(${theme.palette.customColors.dark}, 0.38)`
                          : "text.disabled",
                    }
                  : {
                      ...(mode === "semi-dark" && {
                        color: `rgba(${theme.palette.customColors.dark}, 0.6)`,
                      }),
                    }),
              }}
            >
              <UserIcon
                icon={icon}
                fontSize={parent ? "0.4375rem" : "1.375rem"}
              />
            </ListItemIcon>

            <MenuItemTextMetaWrapper
              sx={{
                ...(isSubToSub ? { ml: 2.5 } : {}),
                ...(navCollapsed && !navHover
                  ? { opacity: 0 }
                  : { opacity: 1 }),
              }}
            >
              <Typography
                sx={{
                  color:
                    mode === "semi-dark"
                      ? `rgba(${theme.palette.customColors.dark}, 0.6)`
                      : "text.secondary",
                }}
                {...((themeConfig.menuTextTruncate ||
                  (!themeConfig.menuTextTruncate &&
                    navCollapsed &&
                    !navHover)) && {
                  noWrap: true,
                })}
              >
                <Translations text={item.title} />
              </Typography>
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || "primary"}
                  sx={{
                    ml: 1.25,
                    height: 20,
                    fontWeight: 500,
                    "& .MuiChip-label": {
                      px: 1.5,
                      textTransform: "capitalize",
                    },
                  }}
                />
              ) : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </Link>
      </ListItem>
    </CanViewNavLink>
  );
};

export default VerticalNavLink;

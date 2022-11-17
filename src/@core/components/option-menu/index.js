import React from "react";

// ** React Imports
import { useState } from "react";

// ** Next Import
import { Link } from "react-router-dom";

// ** MUI Imports
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "@core/components/icon";

// ** Hook Import
import { useSettings } from "@core/hooks/useSettings";

const MenuItemWrapper = ({ children, option }) => {
  if (option.href) {
    return (
      <Link href={option.href} passHref {...option.linkProps}>
        {children}
      </Link>
    );
  } else {
    return <>{children}</>;
  }
};

const OptionsMenu = (props) => {
  // ** Props
  const {
    icon,
    options,
    menuProps,
    iconProps,
    leftAlignMenu,
    iconButtonProps,
  } = props;

  // ** State
  const [anchorEl, setAnchorEl] = useState(null);

  // ** Hook & Var
  const { settings } = useSettings();
  const { direction } = settings;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        {...iconButtonProps}
      >
        {icon ? icon : <Icon icon="bx:dots-vertical-rounded" {...iconProps} />}
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: direction === "ltr" ? "right" : "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: direction === "ltr" ? "right" : "left",
          },
        })}
        {...menuProps}
      >
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <MenuItem key={index} onClick={handleClose}>
                {option}
              </MenuItem>
            );
          } else if ("divider" in option) {
            return (
              option.divider && <Divider key={index} {...option.dividerProps} />
            );
          } else {
            return (
              <MenuItemWrapper key={index} option={option}>
                <MenuItem
                  {...option.menuItemProps}
                  onClick={(e) => {
                    handleClose();
                    option.menuItemProps && option.menuItemProps.onClick
                      ? option.menuItemProps.onClick(e)
                      : null;
                  }}
                >
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItem>
              </MenuItemWrapper>
            );
          }
        })}
      </Menu>
    </>
  );
};

export default OptionsMenu;

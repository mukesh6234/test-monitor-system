// ** MUI Imports
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "../../../@core/components/icon";
import TextField from "@mui/material/TextField";

// ** Components
import ModeToggler from "../../../@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../@core/layouts/components/shared-components/UserDropdown";
import { useSearch, useSearchUpdate } from "context/searchContext";

const AppBarContent = (props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;
  const searchValue = useSearch();
  const handleSearch = useSearchUpdate();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center", width: "80%" }}
      >
        {hidden && !settings.navHidden ? (
          <IconButton
            color="inherit"
            sx={{ ml: -2.75 }}
            onClick={toggleNavVisibility}
          >
            <Icon icon="bx:menu" />
          </IconButton>
        ) : null}
        <IconButton color="inherit" sx={!hidden ? { mr: 1, ml: -2.75 } : {}}>
          <Icon icon="bx:search" />
        </IconButton>
        <TextField
          fullWidth
          className="search"
          placeholder="Search..."
          value={searchValue}
          autoComplete="off"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

export default AppBarContent;

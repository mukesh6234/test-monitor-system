// ** MUI Imports
import React ,{useState,useEffect} from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "../../../@core/components/icon";
import TextField from "@mui/material/TextField";

// ** Components
import Autocomplete from "../../../layouts/components/Autocomplete";
import ModeToggler from "../../../@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../@core/layouts/components/shared-components/UserDropdown";





const AppBarContent = (props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setSearchValue("");
  }, [path]);
  const handleSearchvalue = (e) => {
    setSearchValue(e.target.value);
  };
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
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
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
        {/* <Autocomplete hidden={hidden} settings={settings} /> */}
        <IconButton color='inherit' sx={!hidden ? { mr: 1, ml: -2.75 } : {}}>
          <Icon icon='bx:search' />
        </IconButton> 
        <TextField
                className="search"
                placeholder="Search..."
                value={searchValue}
                autoComplete="off"
                onChange={handleSearchvalue}
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

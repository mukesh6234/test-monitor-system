// ** MUI Imports
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "../../../@core/components/icon";

// ** Components
import Autocomplete from "../../../layouts/components/Autocomplete";
import ModeToggler from "../../../@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../@core/layouts/components/shared-components/UserDropdown";




const AppBarContent = (props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;
  console.log(props, "111111111111111");

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
        <Autocomplete hidden={hidden} settings={settings} />
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

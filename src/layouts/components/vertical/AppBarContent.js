// ** MUI Imports
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "../../../@core/components/icon";

// ** Components
import Autocomplete from "../../../layouts/components/Autocomplete";
import ModeToggler from "../../../@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../@core/layouts/components/shared-components/UserDropdown";
import LanguageDropdown from "../../../@core/layouts/components/shared-components/LanguageDropdown";

const notifications = [
  {
    meta: "Today",
    avatarAlt: "Flora",
    title: "Congratulation Flora! 🎉",
    avatarImg: "/images/avatars/4.png",
    subtitle: "Won the monthly best seller badge",
  },
  {
    meta: "Yesterday",
    avatarColor: "primary",
    subtitle: "5 hours ago",
    avatarText: "Robert Austin",
    title: "New user registered.",
  },
  {
    meta: "11 Aug",
    avatarAlt: "message",
    title: "New message received 👋🏻",
    avatarImg: "/images/avatars/5.png",
    subtitle: "You have 10 unread messages",
  },
  {
    meta: "25 May",
    title: "Paypal",
    avatarAlt: "paypal",
    subtitle: "Received Payment",
    avatarImg: "/images/misc/paypal.png",
  },
  {
    meta: "19 Mar",
    avatarAlt: "order",
    title: "Received Order 📦",
    avatarImg: "/images/avatars/3.png",
    subtitle: "New order received from John",
  },
  {
    meta: "27 Dec",
    avatarAlt: "chart",
    subtitle: "25 hrs ago",
    avatarImg: "/images/misc/chart.png",
    title: "Finance report has been generated",
  },
];

const shortcuts = [
  {
    title: "Calendar",
    icon: "bx:calendar",
    url: "/apps/calendar",
    subtitle: "Appointments",
  },
  {
    icon: "bx:book",
    title: "Invoice App",
    url: "/apps/invoice/list",
    subtitle: "Manage Accounts",
  },
  {
    title: "Users",
    icon: "bx:user",
    url: "/apps/user/list",
    subtitle: "Manage Users",
  },
  {
    url: "/apps/roles",
    icon: "bx:check-shield",
    title: "Role Management",
    subtitle: "Permissions",
  },
  {
    url: "/",
    title: "Dashboard",
    subtitle: "User Dashboard",
    icon: "bx:pie-chart-alt-2",
  },
  {
    icon: "bx:cog",
    title: "Settings",
    subtitle: "Account Settings",
    url: "/pages/account-settings/account",
  },
  {
    title: "Help Center",
    icon: "bx:help-circle",
    url: "/pages/help-center",
    subtitle: "FAQs & Articles",
  },
  {
    title: "Dialogs",
    icon: "bx:window-open",
    subtitle: "Useful Dialogs",
    url: "/pages/dialog-examples",
  },
];

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
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

export default AppBarContent;

import React from "react";


// ** Layout Imports
// !Do not remove this Layout import
import Layout from "@core/layouts/Layout";

// ** Navigation Imports
import VerticalNavItems from "navigation/vertical";

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'
import VerticalAppBarContent from "./components/vertical/AppBarContent";

// ** Hook Import
import { useSettings } from "@core/hooks/useSettings";

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings();


  return (
    <Layout
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems(),

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: (props) => (
            <VerticalAppBarContent
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          ),
        },
      }}
    >
      {children}
    </Layout>
  );
};

export default UserLayout;

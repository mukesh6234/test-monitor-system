// ** React Import
import React, { useEffect, useRef } from "react";

// ** Layout Components
import VerticalLayout from "./VerticalLayout";

const Layout = (props) => {
  // ** Props
  const { hidden, children, settings, saveSettings } = props;

  // ** Ref
  const isCollapsed = useRef(settings.navCollapsed);
  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, navCollapsed: false, layout: "vertical" });
        isCollapsed.current = true;
      } else {
        // if (settings.layout === 'horizontal') {
        //   saveSettings({ ...settings, layout: 'vertical' })
        // }
      }
    } else {
      if (isCollapsed.current) {
        saveSettings({
          ...settings,
          navCollapsed: true,
          layout: settings.lastLayout,
        });
        isCollapsed.current = false;
      } else {
        if (settings.lastLayout !== settings.layout) {
          saveSettings({ ...settings, layout: settings.lastLayout });
        }
      }
    }
  }, [hidden]);

  return <VerticalLayout {...props}>{children}</VerticalLayout>;
};

export default Layout;

// ** React Imports
import { useState } from "react";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ** Icon Imports

// ** Theme Config Import
import themeConfig from "../../configs/themeConfig";

// ** Components
import AppBar from "./components/vertical/appBar";
import Customizer from "../../@core/components/customizer";
import Navigation from "../../@core/layouts/components/vertical/navigation";
import Footer from "./components/shared-components/footer";

// ** Util Import
import { hexToRGBA } from "../../@core/utils/hex-to-rgba";

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const AppBarBgBlur = styled(Box)({
  top: 0,
  zIndex: 10,
  width: "100%",
  position: "fixed",
  backdropFilter: "saturate(200%) blur(10px)",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const VerticalLayout = (props) => {
  // ** Props
  const {
    hidden,
    settings,
    children,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    verticalLayoutProps,
  } = props;

  // ** Vars
  const { skin, appBar, navHidden, appBarBlur, contentWidth } = settings;
  const navigationBorderWidth = skin === "bordered" ? 1 : 0;

  const { navigationSize, disableCustomizer, collapsedNavigationSize } =
    themeConfig;
  const navWidth = navigationSize;
  const collapsedNavWidth = collapsedNavigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        {/* {navHidden &&
        !(navHidden && settings.lastLayout === "horizontal") ? null : ( */}
          <Navigation
            navWidth={navWidth}
            navVisible={navVisible}
            setNavVisible={setNavVisible}
            collapsedNavWidth={collapsedNavWidth}
            toggleNavVisibility={toggleNavVisibility}
            navigationBorderWidth={navigationBorderWidth}
            navMenuContent={verticalLayoutProps.navMenu.content}
            navMenuBranding={verticalLayoutProps.navMenu.branding}
            menuLockedIcon={verticalLayoutProps.navMenu.lockedIcon}
            verticalNavItems={verticalLayoutProps.navMenu.navItems}
            navMenuProps={verticalLayoutProps.navMenu.componentProps}
            menuUnlockedIcon={verticalLayoutProps.navMenu.unlockedIcon}
            afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
            beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
            {...props}
          />
        {/* )} */}
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...(contentHeightFixed && { maxHeight: "100vh" }) }}
        >
          {appBarBlur && appBar === "fixed" && (
            <AppBarBgBlur
              sx={{
                height: (theme) =>
                  theme.spacing(skin === "bordered" ? 4.5 : 3.25),
                background: (theme) =>
                  hexToRGBA(
                    skin === "bordered"
                      ? theme.palette.background.paper
                      : theme.palette.background.default,
                    0.6
                  ),
              }}
            />
          )}

          <AppBar
            toggleNavVisibility={toggleNavVisibility}
            appBarContent={verticalLayoutProps.appBar?.content}
            appBarProps={verticalLayoutProps.appBar?.componentProps}
            {...props}
          />

          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...(contentHeightFixed && {
                overflow: "hidden",
                "& > :first-of-type": { height: "100%" },
              }),
              ...(contentWidth === "boxed" && {
                mx: "auto",
                "@media (min-width:1440px)": { maxWidth: 1440 },
                "@media (min-width:1200px)": { maxWidth: "100%" },
              }),
            }}
          >
            {children}
          </ContentWrapper>

          <Footer
            footerStyles={footerProps?.sx}
            footerContent={footerProps?.content}
            {...props}
          />
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* {disableCustomizer || hidden ? null : <Customizer />} */}
    </>
  );
};

export default VerticalLayout;

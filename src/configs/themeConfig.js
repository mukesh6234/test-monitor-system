/**
 * Config
 * -------------------------------------------------------------------------------------
 * ! IMPORTANT: Make sure you clear the browser local storage in order to see the config changes in the template.
 * ! To clear local storage, you may refer https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/.
 */


const themeConfig = {
  
  // ** Layout Configs
  projectName: "Test Monitoring" /* App Name */,
  templateName: "Katomaran",
  mode: "light" /* light | dark | semi-dark /*! Note: semi-dark value will only work for Vertical Layout */,
  // ** Routing Configs
  routingLoader: true /* true | false */,
  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  navSubItemIcon: "bxs:circle" /* Icon */,
  navigationSize: 260 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
  collapsedNavigationSize: 84 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
  afterVerticalNavMenuContentPosition: "fixed" /* fixed | static */,
  beforeVerticalNavMenuContentPosition: "fixed" /* fixed | static */,
  horizontalMenuAnimation: true /* true | false */,
  // ** AppBar Configs
  appBarBlur: true /* true | false */,
  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: true /* true | false */,
  disableCustomizer: false /* true | false */,
  appBar: 'fixed',
  toastPosition:
    "top-right" /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */,
};

export default themeConfig;

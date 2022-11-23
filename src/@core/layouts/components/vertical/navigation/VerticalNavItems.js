import React from "react";

// ** Custom Menu Components
import VerticalNavLink from "./VerticalNavLink";
import VerticalNavGroup from "./VerticalNavGroup";
import VerticalNavSectionTitle from "./VerticalNavSectionTitle";

const resolveNavItemComponent = (item) => {
  if (item.sectionTitle) return VerticalNavSectionTitle;
  if (item.children) return VerticalNavGroup;
  console.log(item,"vvvvvv");


  return VerticalNavLink;
};

const VerticalNavItems = (props) => {
  // ** Props
  const { verticalNavItems } = props;
  console.log(verticalNavItems,"mmmmmm");

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item);


    return <TagName {...props} key={index} item={item} />;
  });
  return <>{RenderMenuItems}</>;
};

export default VerticalNavItems;

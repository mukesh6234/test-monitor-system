import Icon from "@core/components/icon";
import projectIcon from "../../../public/images/pages/project-icon.png";
const navigation = () => {
  return [
    // {
    //   title: "Dashboards",
    //   icon: "bx:home-circle",
    //   badgeContent: "new",
    //   badgeColor: "error",
    //   children: [
    //     {
    //       title: "Analytics",
    //       path: "/dashboards/analytics",
    //     },
    //     {
    //       title: "CRM",
    //       path: "/dashboards/crm",
    //     },
    //     {
    //       title: "eCommerce",
    //       path: "/dashboards/ecommerce",
    //     },
    //   ],
    // },

    {
      title: "Project",
      icon:  <Icon icon={projectIcon} />,
      path: "/project",
      // children: [
      //   {
      //     title: "Module",
      //     path: "/project/module",
      //   },
      //   {
      //     title: "Test Cases",
      //     path: "/project/test-cases",
      //   },
      //   {
      //     title: "Test Plan",
      //     path: "/project/test-plan",
      //   },
      // ],
    },
    {
      title: "User",
      path: "/user",
      icon: "bx:crown",
    },
  ];
};

export default navigation;

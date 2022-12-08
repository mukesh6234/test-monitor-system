// import Icon from "@core/components/icon";
import Image from "next/image";
import projectIcon from "../../../public/images/pages/project-icon.png";
const navigation = () => {
  return [
    {
      title: "Project",
      icon: "bx:food-menu",
      path: "/project",
    },
    {
      title: "User",
      path: "/user",
      icon: "bx:crown",
    },
  ];
};

export default navigation;

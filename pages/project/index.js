import PageHeader from "components/pageHeader";
import ProjectCard from "components/projectCard";
import React from "react";

export default function Project() {
    const pageHeaderProps={
        title: "Project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        buttonName:"Add Project"
    }
  return (
    <>
      <div>
        <PageHeader
         {...pageHeaderProps}
        />
        <ProjectCard/>
      </div>
    </>
  );
}

import { Divider } from "@mui/material";
import React from "react";
import Icon from "@core/components/icon";

function ProjectCard() {
  return (
    <div className="card-layout">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>Project Name</p>
          <span>
            Create by: <span>Mukesh</span>
          </span>
        </div>
        <span>Nov 28</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>05</p>
          <span>Test Cases</span>
        </div>
        <div>
          <p>05</p>
          <span>Test Runs</span>
        </div>
      </div>
      <Divider />
      <div style={{display:"flex"}}>
        <span style={{ display:"flex", borderRight: "1px solid rgba(50, 71, 92, 0.12)",flex:1,justifyContent:"center",alignItems:"center",padding:10}}>Modules</span>

        <span style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",padding:10}}>Test Plan </span>
      </div>
        
    </div>
  );
}
export default ProjectCard;

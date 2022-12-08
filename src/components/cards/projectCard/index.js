import Image from "next/image";
import React from "react";
// import Icon from "@core/components/icon";
import testPlanIcon from "../../../../public/images/pages/test-plan-icon.png";
import moduleIcon from "../../../../public/images/pages/Modules-icon.png";
import moment from "moment";
import { SliceName, titleize } from "components/helper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    borderRight: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
function ProjectCard(props) {
  const router = useRouter();
  return (
    <Card style={{ padding: 10, display: "grid", gridAutoRows: "auto" }}>
      {/* <div className="card-layout"> */}
      {/* <div onClick={() =>router.push("/")}> */}
      <div
        onClick={() => props.handleEdit(props.id)}
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography style={{fontSize:"1rem"}}>{SliceName(titleize(props.title))}</Typography>

            <Typography variant="caption">
              {props.updated_by ? (
                <>
                  Updated by:{" "}
                  <span style={{ color: "#9155FD" }}>
                    {titleize(props.updated_by?.name)}
                  </span>{" "}
                </>
              ) : (
                <>
                  Created by:{" "}
                  <span style={{ color: "#9155FD" }}>
                    {titleize(props.created_by?.name)}
                  </span>
                </>
              )}
            </Typography>
          </div>
          <Typography sx={{ fontWeight: 500 }}>
            {moment(props.created_at).format("ll")}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <div>
            <Typography sx={{ fontWeight: 500 }} variant="h6">
              {" "}
              {props.test_cases_count}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Test Cases</Typography>
          </div>
          <div>
            <Typography sx={{ fontWeight: 500 }} variant="h6">
              {" "}
              {props.test_plans_count}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Test Runs</Typography>
          </div>
        </div>
      </div>
      {/* </div> */}
      <Divider />
      <div style={{ display: "flex" }}>
        <Link
          href={`/project/modules/${props.id}`}
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <span style={{ marginRight: 10 }}>
            {" "}
            <Image src={moduleIcon} width={20} height={20} alt="test-plans" />
          </span>
          Modules
        </Link>
        <Divider flexItem />
        <Link
          href={`/project/testcases/${props.id}`}
          style={{
            textDecoration: "none",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <span style={{ marginRight: 10 }}>
            <Image src={testPlanIcon} width={20} height={20} alt="test-plans" />
          </span>
          Test Cases{" "}
        </Link>
      </div>
      {/* </div> */}
    </Card>
  );
}
export default ProjectCard;

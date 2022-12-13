import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchModules, showModules } from "../../../api/modules";
import { useAuth } from "hooks/useAuth";
import PageHeader from "components/pageHeader";
import { Grid } from "@mui/material";
import ModuleCard from "components/cards/moduleCard";
import ModuleDialogue from "components/modals/moduleDialogue";
import { useSearch } from "context/searchContext";
import Lottie from "lottie-react";
import noData from "../../../../public/images/lottie/nodata.json";
import { Skeleton } from "@mui/material";

const skeleton = [];
for (let i = 0; i < 12; i++) {
  skeleton.push(
    <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
      <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      <Skeleton
        animation="wave"
        height={15}
        style={{ marginBottom: 6, marginTop: 6 }}
      />
      <Skeleton animation="wave" height={15} width="70%" />
    </Grid>
  );
}

function Modules() {
  const [moduleList, setModuleList] = useState([]);
  const [moduleData, setModuleData] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = useAuth();
  const searchValue = useSearch();
  const { projectId } = router.query;

  useEffect(() => {
    fetModulesIndex();
  }, []);

  useEffect(() => {
    fetModulesIndex();
  }, [searchValue]);

  const fetModulesIndex = async() =>{
    fetchModules(auth.user.auth_token,  projectId,searchValue)
    .then(({ data, total_entries }) => {
      setLoading(false);
      setTotalEntries(total_entries);
      setModuleList(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleClose = () => {
    setFormOpen(!formOpen);
  };

  const handleView = (id) => {
    showModules(auth.user.auth_token, projectId, id).then(({ data }) => {
      setModuleData(data);
      setFormOpen(!formOpen);
    });
  };

  const pageHeaderProps = {
    title: "Modules",
    buttonName: "Add Module",
    navigate: `/projects/${projectId}/modules/addmodule/`,
  };

  const moduleCardProps = {
    projectId: projectId,
    handleView,
    handleClose,
    moduleData,
    formOpen,
  };

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries == 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Lottie
            animationData={noData}
            style={{
              width: "40%",
            }}
          />
        </div>
      )}
      <Grid container spacing={6} marginTop>
        {loading ? (
          <>{skeleton}</>
        ) : (
          moduleList &&
          moduleList.map((module, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                <ModuleCard {...module} {...moduleCardProps} />
              </Grid>
            );
          })
        )}
      </Grid>

      {formOpen && <ModuleDialogue {...moduleCardProps} />}
    </>
  );
}

export default Modules;

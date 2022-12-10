import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchModules, showModules } from "../../api/modules";
import { useAuth } from "hooks/useAuth";
import PageHeader from "components/pageHeader";
import { Grid } from "@mui/material";
import ModuleCard from "components/cards/moduleCard";
import ModuleDialogue from "components/modals/moduleDialogue";
import { useSearch } from "context/searchContext";

function Modules() {
  const [moduleList, setModuleList] = useState([]);
  const [moduleData, setModuleData] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const searchValue = useSearch();
  const { modules } = router.query;

  useEffect(() => {
    fetchModules(auth.user.auth_token,searchValue, modules)
      .then(({ data }) => {
        setModuleList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValue]);

  const handleClose = () => {
    setFormOpen(!formOpen);
  };

  const handleView = (id) => {
    showModules(auth.user.auth_token, modules, id).then(({ data }) => {
      setModuleData(data);
      setFormOpen(!formOpen);
    });
  };

  const pageHeaderProps = {
    title: "Modules",
    buttonName: "Add Module",
    navigate: `/project/modules/addmodule/${modules}`,
  };

  const moduleCardProps = {
    projectId: modules,
    handleView,
    handleClose,
    moduleData,
    formOpen,
  };

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <Grid container spacing={6} marginTop>
        {moduleList &&
          moduleList.map((module, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ModuleCard {...module} {...moduleCardProps} />{" "}
              </Grid>
            );
          })}
      </Grid>

      {formOpen && <ModuleDialogue {...moduleCardProps} />}
    </>
  );
}

export default Modules;

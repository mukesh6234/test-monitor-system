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
import { toast } from "react-hot-toast";
import ModuleForm from "components/modals/moduleForm";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [moduleId, setModuleId] = useState("");
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

  const fetModulesIndex = async () => {
    fetchModules(auth.user.auth_token, projectId, searchValue)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setModuleList(data);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleClose = () => {
    setModalOpen(!modalOpen);
  };

  const handleView = (id) => {
    showModules(auth.user.auth_token, projectId, id).then(({ data }) => {
      setModuleData(data);
      setModalOpen(!modalOpen);
    });
  };

  const handleFormClose = () => {
    setFormOpen(!formOpen);
    setModuleId("");
  };

  const handleEdit = (id) => {
    setModuleId(id);
    setFormOpen(!formOpen);
  };

  const handleSave = () => {
    setFormOpen(!formOpen);
    fetModulesIndex();
    setModuleId("");
  };

  const pageHeaderProps = {
    title: "Modules",
    buttonName: "Add Module",
    setFormOpen,
  };

  const moduleCardProps = {
    projectId,
    handleView,
    handleClose,
    moduleData,
    modalOpen,
    handleEdit,
  };
  const moduleFormProps = {
    formTitle: moduleId ? "Update Module" : "Add Module",
    handleFormClose,
    formOpen,
    id: moduleId,
    handleSave,
    projectId,
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
      {formOpen && <ModuleForm {...moduleFormProps} />}
      {modalOpen && <ModuleDialogue {...moduleCardProps} />}
    </>
  );
}

export default Modules;

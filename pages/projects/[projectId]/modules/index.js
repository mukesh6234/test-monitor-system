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
import { Pagination } from "@mui/material";
import { errorHandler } from "components/helper/errorHandling";

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
  const [loading, setLoading] = useState(true);
  const [totalEntries, setTotalEntries] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 24;
  const router = useRouter();
  const auth = useAuth();
  const { searchValue, handleShowSearch } = useSearch();
  const { projectId } = router.query;

  useEffect(() => {
    fetModulesIndex();
    handleShowSearch(true);
  }, []);

  useEffect(() => {
    fetModulesIndex();
  }, [searchValue]);

  const fetModulesIndex = async () => {
    const params = {
      page,
      perPage,
    };
    fetchModules(auth.user.auth_token, projectId, params, searchValue)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setModuleList(data);
      })
      .catch((error) => {
        errorHandler(error);
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
      {!loading && totalEntries == 0 ? (
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
      ) : (
        <div style={{ minHeight: "65vh" }}>
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
        </div>
      )}
      {formOpen && <ModuleForm {...moduleFormProps} />}
      {modalOpen && <ModuleDialogue {...moduleCardProps} />}
      {totalEntries !== 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          count={Math.ceil(totalEntries / perPage)}
          page={page}
          shape="rounded"
          color="primary"
          onChange={(event, value) => setPage(value)}
          pagesize={Number(perPage)}
        />
      )}
    </>
  );
}

export default Modules;

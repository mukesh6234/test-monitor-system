import React, { useState, useEffect } from "react";
import PageHeader from "components/pageHeader";
import Grid from "@mui/material/Grid";
import CreateProject from "components/modals/projectForm";
import {
  fetchProjects,
  createProject,
  updateProject,
  showProject,
} from "../api/project";
import { useAuth } from "hooks/useAuth";
import ProjectCard from "components/cards/projectCard";
import toast from "react-hot-toast";
import { useSearch } from "context/searchContext";
import Lottie from "lottie-react";
import noData from "../../public/images/lottie/nodata.json";
import { Skeleton } from "@mui/material";
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

export default function Project() {
  const [projects, setProjects] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 24;
  const auth = useAuth();
  const { searchValue, handleShowSearch } = useSearch();
  let auth_token = auth.user.auth_token;

  useEffect(() => {
    fetchProject();
    handleShowSearch(true);
  }, [searchValue, page]);

  const fetchProject = async () => {
    const params = {
      page,
      perPage,
    };
    if (auth.user.role_group) {
      await fetchProjects(auth_token, params, searchValue)
        .then(({ data, total_entries }) => {
          setLoading(false);
          setTotalEntries(total_entries);
          setProjects(data);
        })
        .catch((error) => {
          errorHandler(error);
        });
    }
  };

  const handleClose = () => {
    setFormOpen(!formOpen);
    setTitle("");
    setData("");
  };

  const handleSave = () => {
    setDisabled(true);
    let requestBody = {
      project: {
        title,
      },
    };

    createProject(auth_token, requestBody)
      .then(({ message }) => {
        toast.success(message);
        setFormOpen(!formOpen);
        setTitle("");
        fetchProject();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const handleUpdate = (id) => {
    setDisabled(true);
    let requestBody = {
      project: {
        title,
      },
    };

    updateProject(auth_token, id, requestBody)
      .then(({ message }) => {
        toast.success(message);
        setFormOpen(!formOpen);
        fetchProject();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const handleEdit = async (id) => {
    await showProject(auth_token, id).then(({ data }) => {
      setData(data);
      setTitle(data.title);
      setFormOpen(!formOpen);
    });
  };

  const pageHeaderProps = {
    title: "Projects",
    buttonName: "Add Project",
    setFormOpen,
  };

  const createFormProps = {
    formTitle: "Project Title",
    formOpen,
    handleClose,
    handleSave,
    handleUpdate,
    data,
    value: title,
    setValue: setTitle,
    setDisabled,
    disabled,
  };

  return (
    <div>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
          <Grid
            container
            spacing={6}
            marginTop
            // alignItems={"stretch"}
            // style={{ minHeight: "65vh" }}
          >
            {loading ? (
              <>{skeleton}</>
            ) : (
              projects &&
              projects.map((project, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                    <ProjectCard {...project} handleEdit={handleEdit} />
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      )}
      {formOpen && <CreateProject {...createFormProps} />}

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
    </div>
  );
}

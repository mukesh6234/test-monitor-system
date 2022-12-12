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

const skeleton = [];
for (let i = 0; i < 12; i++) {
  skeleton.push(
    <Grid item xs={12} sm={6} md={3} key={i}>
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
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const auth = useAuth();
  const searchValue = useSearch();
  let auth_token = auth.user.auth_token;

  useEffect(() => {
    fetchProject();
  }, [searchValue]);

  const fetchProject = async () => {
    if (auth.user.role_group) {
      await fetchProjects(auth_token, searchValue)
        .then(({ data, total_entries }) => {
          setLoading(false);
          setTotalEntries(total_entries);
          setProjects(data);
        })
        .catch(({ message }) => {
          toast.error(message);
        });
    }
  };

  const handleClose = () => {
    setFormOpen(!formOpen);
    setTitle("");
  };

  const handleSave = () => {
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
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const handleUpdate = (id) => {
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
      .catch((err) => {
        toast.error(err.data[0]);
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
    title: "Project",
    buttonName: "Add Project",
    setFormOpen,
  };

  const createFormProps = {
    formTitle: "Project Title",
    formDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    formOpen,
    handleClose,
    handleSave,
    handleUpdate,
    data,
    value: title,
    setValue: setTitle,
  };

  return (
    <div>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries === 0 && (
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
              width: "50%",
            }}
          />
        </div>
      )}

      <Grid container spacing={6} marginTop alignItems={"stretch"}>
        {loading ? (
          <>{skeleton}</>
        ) : (
          projects &&
          projects.map((project, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProjectCard {...project} handleEdit={handleEdit} />
              </Grid>
            );
          })
        )}
      </Grid>
      {formOpen && <CreateProject {...createFormProps} />}
    </div>
  );
}

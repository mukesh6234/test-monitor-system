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
import { useSearch,useSearchUpdate } from "context/searchContext";

export default function Project() {
  const [projects, setProjects] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const auth = useAuth();
  const searchValue = useSearch();
  const handleSearch = useSearchUpdate();
  let auth_token = auth.user.auth_token;
  
  useEffect(() => {
    fetchProject();
    handleSearch("");
  console.log(searchValue,"searchValuesearchValue");

  }, []);

  useEffect(() => {
    fetchProject();
  console.log(searchValue,"searchValuesearchValue");

  }, [searchValue]);

  const fetchProject = async () => {
    if (auth.user.role_group) {
      await fetchProjects(auth_token,searchValue).then(({ data }) => {
        setProjects(data);
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
        setFormOpen(!formOpen);
        setTitle("");
        fetchProject();
      })
      .catch((err) => {
        console.error(err);
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
        console.error(err);
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
      <Grid container spacing={6} marginTop alignItems={"stretch"}>
        {projects &&
          projects.map((project, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProjectCard {...project} handleEdit={handleEdit} />
              </Grid>
            );
          })}
      </Grid>
      {formOpen && <CreateProject {...createFormProps} />}
    </div>
  );
}

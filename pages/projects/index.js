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
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 50;
  const auth = useAuth();
  const searchValue = useSearch();
  let auth_token = auth.user.auth_token;

  useEffect(() => {
    fetchProject();
  }, [searchValue]);

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
        .catch((err) => {
          if (err[1]) {
            toast.error(err[1] ? err[1]?.data[0] : "Something not right");
          } else {
            toast.error(err.message);
          }
        });
    }
  };

  const handleClose = () => {
    setFormOpen(!formOpen);
    setTitle("");
    setData("");
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
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
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
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleEdit = async (id) => {
    await showProject(auth_token, id).then(({ data }) => {
      setData(data);
      setTitle(data.title);
      setFormOpen(!formOpen);
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const pageHeaderProps = {
    title: "Project",
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
              width: "40%",
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
              <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                <ProjectCard {...project} handleEdit={handleEdit} />
              </Grid>
            );
          })
        )}
      </Grid>
      {formOpen && <CreateProject {...createFormProps} />}
      <Pagination
        // count={10}
        style={{display: "flex", justifyContent:"flex-end",margin:"20px auto"}}
        page={page}
        shape="rounded"
        color="primary"
        setPage={handlePageChange}
        total={perPage}
      />
    </div>
  );
}

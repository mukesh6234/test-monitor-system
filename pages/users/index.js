import React, { useState, useEffect } from "react";
import PageHeader from "components/pageHeader";
import { userList } from "../api/User";
import { useAuth } from "hooks/useAuth";
import UserCard from "components/cards/userCard";
import Grid from "@mui/material/Grid";
import { useSearch } from "context/searchContext";
import noData from "../../public/images/lottie/nodata.json";
import Lottie from "lottie-react";
import { Skeleton } from "@mui/material";
import { toast } from "react-hot-toast";
import UserForm from "components/modals/userForm";
import { Pagination } from "@mui/material";
import { errorHandler } from "components/helper/errorHandling";

const skeleton = [];
for (let i = 0; i < 12; i++) {
  skeleton.push(
    <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
      <Skeleton sx={{ height: 80 }} animation="wave" variant="rectangular" />
      <Skeleton animation="wave" height={15} width="70%" />
    </Grid>
  );
}

function User() {
  const [userLists, setUserLists] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 24;
  const auth = useAuth();
  const { searchValue, handleShowSearch } = useSearch();

  useEffect(() => {
    fetchUser();
    handleShowSearch(false);
  }, [searchValue]);

  const fetchUser = () => {
    const params = {
      page,
      perPage,
    };
    userList(auth.user.auth_token, params, searchValue)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setUserLists(data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const handleClose = () => {
    setFormOpen(!formOpen);
    setUserId("");
  };

  const handleSave = () => {
    setFormOpen(!formOpen);
    fetchUser();
    setUserId("");
  };

  const handleEdit = (id) => {
    setUserId(id);
    setFormOpen(!formOpen);
  };
  const userFormProps = {
    formTitle: userId ? "Update User" : "Add User",
    formOpen,
    handleClose,
    handleSave,
    id: userId,
  };

  const pageHeaderProps = {
    title: "Users",
    buttonName: "Add User",
    setFormOpen,
  };

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      {!loading && totalEntries === 0 ? (
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
          <Grid container spacing={6} marginTop alignItems={"stretch"}>
            {loading ? (
              <>{skeleton}</>
            ) : (
              userLists &&
              userLists.map((userList, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                    <UserCard {...userList} handleEdit={handleEdit} />
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      )}
      {formOpen && <UserForm {...userFormProps} />}

      {totalEntries !== 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: "20px",
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

export default User;

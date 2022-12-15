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
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const searchValue = useSearch();

  const pageHeaderProps = {
    title: "User",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    buttonName: "Add User",
    navigate: "users/adduser",
  };

  useEffect(() => {
    fetchUser();
  }, [searchValue]);

  const fetchUser = () => {
    userList(auth.user.auth_token, searchValue)
      .then(({ data, total_entries }) => {
        setLoading(false);
        setTotalEntries(total_entries);
        setUserLists(data);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <>
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
          userLists &&
          userLists.map((userList, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                <UserCard {...userList} />
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}

export default User;

import React, { useState, useEffect } from "react";
import PageHeader from "components/pageHeader";
import { userList } from "../api/User";
import { useAuth } from "hooks/useAuth";
import UserCard from "components/cards/userCard";
import Grid from "@mui/material/Grid";

function User() {
  const [userLists, setUserLists] = useState([]);
  const auth = useAuth();

  const pageHeaderProps = {
    title: "User",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    buttonName: "Add User",
    navigate: "user/add-user",
  };

  useEffect(() => {
    userList(auth.user.auth_token).then(({ data }) => {
      setUserLists(data);
    });
  }, []);

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <Grid container spacing={6} marginTop alignItems={"stretch"}>
        {userLists &&
          userLists.map((userList, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <UserCard {...userList} />{" "}
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
export default User;

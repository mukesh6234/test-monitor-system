// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import authConfig from "../../../src/configs/auth";
import profileCover from "../../../public/images/pages/profile-cover.jpg";
import { useAuth } from "hooks/useAuth";

// ** Third Party Imports

// ** Icon Imports
import Icon from "@core/components/icon";
import {
  userProfile,
  updateProfile,
  updatePassword,
} from "../../api/authentication";
import { errorHandler } from "components/helper/errorHandling";
import Image from "next/image";
import toast from "react-hot-toast";

import {
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearch } from "context/searchContext";

const schema = yup.object().shape({
  email: yup.string().email().required("Please fill the email"),
  name: yup.string().required("Please fill the name"),
});

const profileValue = {
  name: "",
  email: "",
};

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileDisabled, setProfileDisabled] = useState(true);
  const [passDisabled, setPassDisabled] = useState(true);
  const { handleShowSearch } = useSearch();
  const auth = useAuth();
  const [values, setValues] = useState({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });

  // ** Var

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    profileValue,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    handleShowSearch(false);
    fetchProfile();
  }, [reset]);

  const onSubmit = (data) => {
    setProfileDisabled(false);
    let payload = {
      name: data.name,
      email: data.email,
    };
    updateProfile(auth.user.auth_token, payload)
      .then(({ message }) => {
        toast.success(message);
        fetchProfile();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
  // ** State

  const fetchProfile = async () => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );

    await userProfile(storedToken)
      .then(({ data }) => {
        // setLoading(false);
        reset(data);
        setProfileData(data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const onPasswordFormSubmit = () => {
    setPassDisabled(false);
    let payload = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    updatePassword(auth.user.auth_token, payload)
      .then(({ message }) => {
        toast.success(message);
        setCurrentPassword("");
        setNewPassword("");
        fetchProfile();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
  console.log(passDisabled, "passDisabled");
  return profileData !== null ? (
    <>
      <Card>
        <Image
          // component="img"
          alt="profile-header"
          src={profileCover}
          style={{
            height: 200,
          }}
        />
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          {/* <div style={{background: "linear-gradient(to right, rgba(137,247,254,0.65), rgba(102,166,255,0.65))",}}/> */}
          <CardContent
            sx={{
              pt: 0,
              mt: -8,
              display: "flex",
              alignItems: "flex-end",
              flexWrap: { xs: "wrap", md: "nowrap" },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <ProfilePicture
              src={profileData.image_path}
              alt="profile-picture"
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                ml: { xs: 0, md: 6 },
                alignItems: "flex-end",
                flexWrap: ["wrap", "nowrap"],
                justifyContent: ["center", "space-between"],
              }}
            >
              <Box
                sx={{
                  mb: [6, 0],
                  display: "flex",
                  flexDirection: "column",
                  alignItems: ["center", "flex-start"],
                }}
              >
                <Typography variant="h5" sx={{ mb: 4, fontSize: "1.375rem" }}>
                  {profileData.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: ["center", "flex-start"],
                  }}
                >
                  <Box
                    sx={{
                      mr: 4,
                      display: "flex",
                      alignItems: "center",
                      "& svg": { mr: 1, color: "text.secondary" },
                    }}
                  >
                    <Icon icon="bx:star" />
                    <Typography
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      {profileData.role_group.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mr: 4,
                      display: "flex",
                      alignItems: "center",
                      "& svg": { mr: 1, color: "text.secondary" },
                    }}
                  >
                    <Icon icon="bx:envelope" />
                    <Typography
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      {profileData.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                type="submit"
                variant="contained"
                style={{ pointerEvents: !profileDisabled ? "none" : "" }}
                startIcon={<Icon icon="bx:user-check" fontSize={20} />}
              >
                Update Profile
              </Button>
            </Box>
          </CardContent>
          <CardContent style={{ paddingBottom: 0 }}>
            <div
              style={{ padding: 10, display: "flex", flexDirection: "column" }}
            >
              {" "}
              <FormControl sx={{ mb: 5, width: "50%" }}>
                <InputLabel error={Boolean(errors.name)}>Full Name</InputLabel>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="ull Name"
                      onChange={(e) => {
                        onChange(e);
                        setProfileDisabled(true);
                      }}
                      error={Boolean(errors.name)}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon fontSize={20} icon={"bx:user"} />
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>{" "}
              <FormControl sx={{ mb: 5, width: "50%" }}>
                <InputLabel error={Boolean(errors.email)}>Email</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="Email"
                      onChange={(e) => {
                        onChange(e);
                        setProfileDisabled(true);
                      }}
                      error={Boolean(errors.email)}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon fontSize={20} icon={"bx:envelope"} />
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
          </CardContent>
        </form>
        <CardContent style={{ paddingTop: 0 }}>
          <CardHeader style={{ padding: 10 }} title="Change Password" />
          <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
            <div
              style={{ padding: 10, display: "flex", flexDirection: "column" }}
            >
              <FormControl sx={{ mb: 5, width: "50%" }}>
                <InputLabel
                  htmlFor="input-current-password"
                  error={Boolean(errors.currentPassword)}
                >
                  Current Password
                </InputLabel>
                {/* <Controller
                  name="currentPassword"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => ( */}
                <OutlinedInput
                  value={currentPassword}
                  label="Current Password"
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setPassDisabled(true);
                  }}
                  id="input-current-password"
                  type={values.showCurrentPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownCurrentPassword}
                      >
                        <Icon
                          icon={
                            values.showCurrentPassword ? "bx:show" : "bx:hide"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {/* )}
                /> */}
                {/* {errors.currentPassword && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.currentPassword.message}
                  </FormHelperText>
                )} */}
              </FormControl>
              <FormControl sx={{ mb: 5, width: "50%" }}>
                <InputLabel
                  htmlFor="input-new-password"
                  error={Boolean(errors.newPassword)}
                >
                  New Password
                </InputLabel>
                {/* <Controller
                  name="newPassword"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => ( */}
                <OutlinedInput
                  value={newPassword}
                  label="New Password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPassDisabled(true);
                  }}
                  id="input-new-password"
                  error={Boolean(errors.newPassword)}
                  type={values.showNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                      >
                        <Icon
                          icon={values.showNewPassword ? "bx:show" : "bx:hide"}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {/* )}
                /> */}
                {/* {errors.newPassword && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.newPassword.message}
                  </FormHelperText>
                )} */}
              </FormControl>
            </div>

            <Button
              variant="contained"
              style={{ pointerEvents: !passDisabled ? "none" : "" }}
              type="submit"
              sx={{ ml: 2 }}
            >
              Save Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  ) : null;
};

export default UserProfile;

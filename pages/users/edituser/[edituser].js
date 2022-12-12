import React, { useState, useEffect } from "react";
import { Divider, FormControl, MenuItem, Select, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import { showUser, userRoles, updateUser } from "../../api/User";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required("Please fill the name"),
  role_group: yup.string().required("Please select a role"),
  status: yup.string().required("Please select a status"),
});

const defaultValues = {
  email: "",
  name: "",
  role_group: "",
  status: "",
};

function EditUser() {
  const [roleGroup, setRoleGroup] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { edituser } = router.query;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    userRoles(auth.user.auth_token)
      .then(({ data }) => {
        setRoleGroup(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      await showUser(auth.user.auth_token, edituser).then(({ data }) => {
        reset(data);
      });
    };
    fetchUser();
  }, [reset]);

  const onSubmit = (data) => {
    let payload = {
      user: {
        name: data.name,
        email: data.email,
        role_group_id: data.role_group,
        status: data.status,
      },
    };
    updateUser(auth.user.auth_token,edituser, payload).then(({ message }) => {
      toast.success(message);
      router.push("/user");
    });
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Edit User</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push("/user")}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
        </div>
        <Divider />
        <Grid
          container
          spacing={6}
          columnGap={5}
          marginTop
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={4}>
            Name
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  fullWidth
                  size={"small"}
                  placeholder={"Enter your full name"}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  errors={Boolean(errors.name)}
                  helperText={
                    errors.name && errors.name[index].description.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            Email ID
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  fullWidth
                  size={"small"}
                  placeholder={"Enter your email id"}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  errors={Boolean(errors.email)}
                  helperText={
                    errors.email && errors.email[index].description.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            Role
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="role_group"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    size="small"
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.role_group)}
                    placeholder="Select user role"
                    value={value}
                  >
                    {roleGroup.map((role) => {
                      return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>;
                    })}
                  </Select>
                )}
              />
              {errors.role_group && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.role_group.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            Status
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    size="small"
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.status)}
                    placeholder="Select status"
                    value={value}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                )}
              />
              {errors.status && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.status.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EditUser;

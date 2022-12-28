import React, { useState, useEffect } from "react";
import { FormControl, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUser,
  userRoles,
  showUser,
  updateUser,
} from "../../../pages/api/User";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import TextInput from "@core/components/input/textInput";
import SelectInput from "@core/components/input/select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { errorHandler } from "components/helper/errorHandling";

const schema = yup.object().shape({
  email: yup.string().email().required("Please fill the email"),
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
const statusOption = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];
function UserForm(props) {
  const [roleGroup, setRoleGroup] = useState([]);
  const auth = useAuth();

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
        setRoleGroup(
          data.map((role) => {
            return { label: role.name, value: role.id };
          })
        );
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      await showUser(auth.user.auth_token, props.id)
        .then(({ data }) => {
          props.id && reset(data);
        })
        .catch((error) => {
          errorHandler(error);
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
        send_welcome: "true",
      },
    };
    (props.id
      ? updateUser(auth.user.auth_token, props.id, payload)
      : createUser(auth.user.auth_token, payload)
    )
      .then(({ message }) => {
        toast.success(message);
        props.handleSave();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  return (
    <Dialog
      fullWidth
      sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 700 } }}
      open={props.formOpen}
      onClose={props.handleClose}
    >
      <DialogTitle style={{ display: "flex", flexDirection: "column" }}>
        {props.formTitle}
        <span style={{ fontSize: "16px" }}>{props.formDescription}</span>
      </DialogTitle>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6} justifyContent={"center"}>
            <Grid item xs={6}>
              Name
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
                    size={"small"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.name)}
                    helperText={errors.name && errors.name.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              Email ID
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
                    size={"small"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              Role
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name="role_group"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectInput
                      size={"small"}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder={"Select user role"}
                      error={Boolean(errors.role_group)}
                      helperText={
                        errors.role_group ? errors.role_group.message : ""
                      }
                      options={roleGroup}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              Status
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectInput
                      size={"small"}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      defaultValue={"active"}
                      value={value}
                      placeholder={"Select status"}
                      error={Boolean(errors.status)}
                      helperText={errors.status ? errors.status.message : ""}
                      options={statusOption}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {props.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UserForm;

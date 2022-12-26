import {
  Button,
  Card,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import PageHeader from "components/pageHeader";
import TextInput from "@core/components/input/textInput";
import Icon from "@core/components/icon";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please fill the Name"),
  name: yup.string().required("Please fill the email"),
  role: yup.string().required(),
});

const defaultValues = {
  name: "",
  email: "",
  role: "",
};

function UserProfile() {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("Processing");
    console.log(data);
  };

  return (
    <Card style={{ maxWidth: "50%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Typography variant="h6"> Profile</Typography>
        <Button
          size="small"
          variant="contained"
          //   onClick={(e) => handleSubmit(e)}
        >
          Update profile
        </Button>
      </div>
      <Divider />
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: 20 }}>
          {" "}
          <FormControl fullWidth sx={{ mb: 5 }}>
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
                  onChange={onChange}
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
          <FormControl fullWidth sx={{ mb: 5 }}>
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
                  onChange={onChange}
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
          <FormControl fullWidth sx={{ mb: 5 }}>
            <InputLabel error={Boolean(errors.role)}>User Role</InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  readOnly
                  onBlur={onBlur}
                  label="User Role"
                  onChange={onChange}
                  error={Boolean(errors.role)}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon fontSize={20} icon={"bx:star"} />
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.role && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.role.message}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </form>
    </Card>
  );
}
export default UserProfile;

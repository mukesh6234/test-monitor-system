import React from "react";
import {
  Divider,
  FormControl,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import { createModule } from "../../api/modules";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the name"),
  description: yup.string().required("Please fill the description"),
  status: yup.string().required("Please select a status"),
});

const defaultValues = {
  title: "",
  description: "",
  status: "",
};

function AddModule() {
  const auth = useAuth();
  const router = useRouter();
  const { projectId } = router.query;

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
    let payload = {
      sections: {
        title: data.title,
        status: data.status,
        description: data.description,
      },
    };
    createModule(auth.user.auth_token, projectId, payload).then(
      ({ message }) => {
        toast.success(message);
        router.push(`/projects/${projectId}/modules`);
      }
    );
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Add Module</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push(`/projects/${projectId}/modules`)}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Create
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
            Title
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  fullWidth
                  size={"small"}
                  autoFocus={true}
                  placeholder={"Enter Module Title"}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  errors={Boolean(errors.title)}
                  helperText={errors.title && errors.title.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            Status
            <FormControl fullWidth sx={{ mb: 6 }}>
              {/* <InputLabel id="role-select">Select Role</InputLabel> */}
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
                    <MenuItem value="started">Started</MenuItem>
                    <MenuItem value="inprogress">Inprogress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
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
          <Grid item xs={8}>
            Description
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  multi={true}
                  rows={4}
                  fullWidth
                  size={"small"}
                  placeholder={"Enter Module Description"}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  errors={Boolean(errors.description)}
                  helperText={errors.description && errors.description.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default AddModule;

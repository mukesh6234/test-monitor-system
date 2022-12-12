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
import { createModule } from "../../../api/modules";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the title"),
  section: yup.string().required("Please select a module"),
});

const defaultValues = {
  title: "",
  description: "",
  section: "",
};

function EditTestPlan() {
  const auth = useAuth();
  const router = useRouter();
  const { addmodule } = router.query;

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
        section: data.section,
      },
    };
    createModule(auth.user.auth_token, addmodule, payload).then(
      ({ message }) => {
        toast.success(message);
        router.push(`/project/modules/${addmodule}`);
      }
    );
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Add Test Plan</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push(`/project/testplan`)}
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
          <Grid item xs={8}>
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
          <Grid item xs={8}>
          Add Module
            <FormControl fullWidth sx={{ mb: 6 }}>
              {/* <InputLabel id="role-select">Select Role</InputLabel> */}
              <Controller
                name="section"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    size="large"
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.section)}
                    placeholder="Select Module"
                    value={value}
                  >
                    <MenuItem value="started">Started</MenuItem>
                    <MenuItem value="inprogress">Inprogress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                )}
              />
              {errors.section && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.section.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={8}>
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
          </Grid> */}
        </Grid>
      </form>
    </>
  );
}

export default EditTestPlan;

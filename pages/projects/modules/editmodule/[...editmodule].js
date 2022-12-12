import React, { useEffect } from "react";
import { Divider, FormControl, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateModule, showModules } from "../../../api/modules";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";
import SelectInput from "@core/components/input/select";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the name"),
  description: yup.string().required("Please fill the description"),
  status: yup.string().required("Please select a status"),
});

const options = [
  {
    value: "started",
    label: "Started",
  },
  {
    value: "inprogress",
    label: "Inprogress",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];
function EditModule() {
  const auth = useAuth();
  const router = useRouter();
  const { editmodule } = router.query;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { title: "", description: "", status: "" },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const fetchModules = async () => {
      await showModules(
        auth.user.auth_token,
        editmodule[0],
        editmodule[1]
      ).then(({ data }) => {
        reset(data);
      });
    };
    fetchModules();
  }, [reset]);

  const onSubmit = (data) => {
    let payload = {
      sections: {
        title: data.title,
        status: data.status,
        description: data.description,
      },
    };
    updateModule(
      auth.user.auth_token,
      editmodule[0],
      editmodule[1],
      payload
    ).then(({ message }) => {
      toast.success(message);
      router.push(`/project/modules/${editmodule[0]}`);
    });
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Edit Module</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push(`/project/modules/${editmodule[0]}`)}
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
            Title
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  fullWidth
                  autoFocus={true}
                  size={"small"}
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
                    value={value}
                    placeholder={"Select status"}
                    error={Boolean(errors.status)}
                    helperText={errors.status ? errors.status.message : ""}
                    options={options}
                  />
                )}
              />
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
                  fullWidth
                  multi
                  rows={4}
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

export default EditModule;

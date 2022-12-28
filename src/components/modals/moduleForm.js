import React, { useEffect } from "react";
import { FormControl, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import {
  createModule,
  updateModule,
  showModules,
} from "../../../pages/api/modules";
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
  title: yup.string().required("Please fill the name"),
  description: yup.string().required("Please fill the description"),
  status: yup.string().required("Please select a status"),
});

const defaultValues = {
  title: "",
  description: "",
  status: "",
};
const moduleStatus = [
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

function ModuleForm(props) {
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
    const fetchModules = async () => {
      await showModules(auth.user.auth_token, props.projectId, props.id)
        .then(({ data }) => {
          props.id && reset(data);
        })
        .catch((error) => {
          errorHandler(error);
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
    (props.id
      ? updateModule(auth.user.auth_token, props.projectId, props.id, payload)
      : createModule(auth.user.auth_token, props.projectId, payload)
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
        Add Module
        <span style={{ fontSize: "16px" }}>{props.formDescription}</span>
      </DialogTitle>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid
            container
            spacing={6}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={6}>
              Title
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
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
            <Grid item xs={6}>
              Status
              <FormControl fullWidth sx={{ mb: 6 }}>
                {/* <InputLabel id="role-select">Select Role</InputLabel> */}
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
                      options={moduleStatus}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
                    helperText={
                      errors.description && errors.description.message
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleFormClose}
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

export default ModuleForm;

import React, { useState, useEffect } from "react";
import { Divider, FormControl, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchModules } from "../../../pages/api/modules";
import {
  createTestPlan,
  updateTestPlan,
  showTestPlan,
} from "../../../pages/api/testPlan";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";
import { useSearch } from "context/searchContext";
import MultiSelectInput from "@core/components/input/multiSelect";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the title"),
  section_ids: yup.array().of(yup.string().required("Please select a module")),
});

const defaultValues = {
  title: "",
  section_ids: [],
};

function TestPlanForm(props) {
  const [options, setOptions] = useState([]);
  const auth = useAuth();
  const searchValue = useSearch();
  const router = useRouter();
  const { projectId } = router.query;

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
    const params = {
      page: 1,
      perPage: 100,
    };
    fetchModules(auth.user.auth_token, projectId, params, searchValue)
      .then(({ data }) => {
        setOptions(
          data.map((module) => {
            return { label: module.title, value: module.id };
          })
        );
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  useEffect(() => {
    const fetchTestPlan = async () => {
      await showTestPlan(auth.user.auth_token, projectId, props.id)
        .then(({ data }) => {
          props.id && reset(data);
        })
        .catch((err) => {
          if (err[1]) {
            toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
          } else {
            toast.error(err.message);
          }
        });
    };
    fetchTestPlan();
  }, [reset]);

  const onSubmit = (data) => {
    let payload = {
      test_plan: {
        title: data.title,
        section_ids: data.section_ids.map((value) => {
          return value;
        }),
      },
    };
    (props.id
      ? updateTestPlan(auth.user.auth_token, projectId, props.id, payload)
      : createTestPlan(auth.user.auth_token, projectId, payload)
    )
      .then(({ message }) => {
        toast.success(message);
        props.handleSave();
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1]?.data ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
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
        <DialogContent style={{ padding: "0 1.5rem" }}>
          <Grid
            container
            spacing={6}
            marginTop
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              Add Module
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name="section_ids"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <MultiSelectInput
                      size={"small"}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      multiple={true}
                      placeholder={"Select Module"}
                      error={Boolean(errors.section_ids)}
                      helperText={
                        errors.section_ids ? errors.section_ids.message : ""
                      }
                      options={options}
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

export default TestPlanForm;

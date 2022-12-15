import React, { useState, useEffect } from "react";
import { Divider, FormControl, MenuItem, Select, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import { updateTestPlan, showTestPlan } from "../../../api/testPlan";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextInput from "@core/components/input/textInput";
import { useSearch } from "context/searchContext";
import SelectInput from "@core/components/input/select";
import MultiSelectInput from "@core/components/input/multiSelect";
import { fetchModules } from "../../../api/modules";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the title"),
  section_ids: yup.array().of(yup.string().required("Please select a module")),
});

const defaultValues = {
  title: "",
  section_ids: [],
};

function EditTestPlan() {
  const [options, setOptions] = useState([]);
  const auth = useAuth();
  const searchValue = useSearch();
  const router = useRouter();
  const { edittestplan, projectId } = router.query;
  console.log(router.query, "bbbbbbbbbbb");

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
    const fetchTestPlan = async () => {
      await showTestPlan(auth.user.auth_token, projectId, edittestplan[0])
        .then(({ data }) => {
          reset(data);
        })
        .catch((err) => {
          if (err[1]) {
            toast.error(err[1] ? err[1]?.data[0] : "Something not right");
          } else {
            toast.error(err.message);
          }
        });
    };
    fetchTestPlan();
  }, [reset]);

  useEffect(() => {
    fetchModules(auth.user.auth_token, projectId, searchValue).then(
      ({ data }) => {
        setOptions(
          data.map((module) => {
            return { label: module.title, value: module.id };
          })
        ).catch((err) => {
          if (err[1]) {
            toast.error(err[1] ? err[1]?.data[0] : "Something not right");
          } else {
            toast.error(err.message);
          }
        });
      }
    );
  }, []);

  const onSubmit = (data) => {
    let payload = {
      test_plan: {
        title: data.title,
        section_ids: data.section_ids.map((value) => {
          return value;
        }),
      },
    };
    updateTestPlan(auth.user.auth_token, projectId, edittestplan[0], payload)
      .then(({ message }) => {
        toast.success(message);
        router.push(`/projects/${projectId}/testplans`);
      })
      .catch((err) => {
        if (err[1]) {
          toast.error(err[1] ? err[1]?.data[0] : "Something not right");
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Edit Test Plan</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push(`/projects/${projectId}/testplans`)}
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
      </form>
    </>
  );
}

export default EditTestPlan;

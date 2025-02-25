import React, { useState, useEffect } from "react";
import { Divider, FormControl, Grid, OutlinedInput, Box } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateTestCase, showTestCase } from "../../../api/testCases";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Icon from "@core/components/icon";
import SelectInput from "@core/components/input/select";
import TextInput from "@core/components/input/textInput";
import { fetchModules } from "../../../api/modules";
import { useSearch } from "context/searchContext";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { hexToRGBA } from "@core/utils/hex-to-rgba";
import { styled } from "@mui/material/styles";
import { errorHandler } from "components/helper/errorHandling";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the title"),
  description: yup.string().required("Please fill the description"),
  prerequisite: yup.string().required("Please fill the prerequisite"),
  expected_result: yup.string().required("Please fill the expected_result"),
  section: yup.string().required("Please select a module"),
  automation: yup.string().required("Please select a automation type"),
  app_type: yup.string().required("Please select a app type"),
});

const defaultValues = {
  title: "",
  description: "",
  section: "",
  prerequisite: "",
  steps: [{ description: "" }],
  expected_result: "",
  automation: "",
  app_type: "",
};

const ContentLayout = styled(Box)(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  color: theme.palette.text.primary,
  paddingBottom: "20px",
}));

const automationOption = [
  {
    label: "Applicable",
    value: "applicable",
  },
  { label: "Not-Applicable", value: "not_applicable" },
  {
    label: "Automated",
    value: "automated",
  },
];

const apptypeOption = [
  {
    label: "Mobile App",
    value: "mobile_app",
  },
  { label: "Web App", value: "web_app" },
];

function EditTestCases() {
  const [options, setOptions] = useState([]);
  const [update, setupdate] = useState(0);
  const auth = useAuth();
  const router = useRouter();
  const { searchValue, handleShowSearch } = useSearch();
  const { edittestcase, projectId } = router.query;
  console.log(router, "edittestcase");

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "steps",
    control,
  });

  useEffect(() => {
    handleShowSearch(false);
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
      .catch((error) => {
        errorHandler(error);
      });
  }, []);

  useEffect(() => {
    const fetchTestCase = async () => {
      await showTestCase(auth.user.auth_token, projectId, edittestcase[0])
        .then(({ data }) => {
          reset(data);
        })
        .catch((error) => {
          errorHandler(error);
        });
    };
    fetchTestCase();
  }, [reset]);

  useEffect(() => {
    if (getValues("steps")[getValues("steps").length - 1].description !== "") {
      handleSteps();
    }
  }, [update]);

  const formValidate = () => {
    const isValid = getValues("steps").some(
      (steps) => steps.description
    );
    if (!isValid) {
      setError(`steps[${0}].description`, {
        type: "manual",
        message: "Please fill the testing steps",
      });
      return true;
    }
  };

  const onSubmit = (data) => {
    if (!formValidate()) {
    let stepData = [];
    data.steps.filter(
      (testStep) =>
        testStep.description != "" &&
        stepData.push({ description: testStep.description })
    );
    let payload = {
      test_case: {
        title: data.title,
        prerequisite: data.prerequisite,
        description: data.description,
        expected_result: data.expected_result,
        section_id: data.section,
        steps: stepData,
        automation: data.automation,
        app_type: data.app_type,
      },
    };

    updateTestCase(auth.user.auth_token, projectId, edittestcase[0], payload)
      .then(({ message }) => {
        toast.success(message);
        setTimeout(() => {
          router.push(`/projects/${projectId}/testcases`);
        }, 1000);
      })
      .catch((error) => {
        errorHandler(error);
      });
    }
  };

  const handleSteps = () => {
    append({ description: "", id: fields.length + 1 });
  };

  return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Edit Test Case</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push(`/projects/${projectId}/testcases`)}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
        </div>
        <div style={{ padding: "0.5rem 0" }}>
          <Divider />
        </div>
        <ContentLayout
          className="navbar-content-container"
          sx={{
            backgroundColor: (theme) =>
              hexToRGBA(theme.palette.background.paper, 1),
            boxShadow: 6,
            //   height: "80vh",
          }}
        >
          <Grid container spacing={5} padding={"0 20px"} marginTop>
            <Grid item xs={3}>
              Title
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
                    size={"small"}
                    placeholder={"Enter Test Case Title"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.title)}
                    helperText={errors.title && errors.title.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              Modules
              <FormControl fullWidth>
                <Controller
                  name="section"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectInput
                      size={"small"}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder={"Select Module"}
                      error={Boolean(errors.section)}
                      helperText={errors.section ? errors.section.message : ""}
                      options={options}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              Automation
              <FormControl fullWidth>
                <Controller
                  name="automation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectInput
                      size={"small"}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder={"Select Module"}
                      error={Boolean(errors.automation)}
                      helperText={
                        errors.automation ? errors.automation.message : ""
                      }
                      options={automationOption}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              App Type
              <FormControl fullWidth>
                <Controller
                  name="app_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectInput
                      size={"small"}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder={"Select Module"}
                      error={Boolean(errors.app_type)}
                      helperText={
                        errors.app_type ? errors.app_type.message : ""
                      }
                      options={apptypeOption}
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
                    fullWidth
                    multi
                    rows={5}
                    size={"small"}
                    placeholder={"Enter Test Case Description"}
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
            <Grid item xs={12}>
              Prerequisite
              <Controller
                name="prerequisite"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
                    multi
                    rows={5}
                    size={"small"}
                    placeholder={"Enter your prerequisite"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.prerequisite)}
                    helperText={
                      errors.prerequisite && errors.prerequisite.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              Testing Steps
              {fields.map((testingStep, index) => (
                <Controller
                name={`steps[${index}].description`}
                  key={testingStep.id}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      fullWidth
                      size={"small"}
                      placeholder={"Enter testing steps..."}
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => {
                        setupdate(update + 1);
                        onChange(e);
                      }}
                      error={Boolean(errors?.steps?.[index]?.description)}
                      helperText={
                        Boolean(errors?.steps?.[index]?.description) &&
                        errors?.steps?.[index]?.description?.message
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() =>
                              getValues("steps").length > 1 && remove(index)
                            }
                          >
                            <Icon fontSize={20} icon="bxs-trash" />
                          </IconButton>
                        </InputAdornment>
                      }
                      style={{ margin: "10px 0" }}
                    />
                  )}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{
                  border: "1px dashed #9155FD",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleSteps}
              >
                <Icon icon="bx:plus" fontSize={20} />
                <span style={{ paddingLeft: 10 }}>Add Steps</span>
              </Button>
            </Grid>
            <Grid item xs={12}>
              Expected Result
              <Controller
                name="expected_result"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
                    multi
                    rows={3}
                    size={"small"}
                    placeholder={"Enter expected result"}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.expected_result)}
                    helperText={
                      errors.expected_result && errors.expected_result.message
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </ContentLayout>
      </form>
  );
}

export default EditTestCases;

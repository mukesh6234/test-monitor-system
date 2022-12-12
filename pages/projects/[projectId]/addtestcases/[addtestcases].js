import React, { useState, useEffect } from "react";
import { Divider, FormControl, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTestCase } from "../../../api/testCases";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Icon from "@core/components/icon";
import SelectInput from "@core/components/input/select";
import TextInput from "@core/components/input/textInput";
import { fetchModules } from "../../../api/modules";

const schema = yup.object().shape({
  title: yup.string().required("Please fill the title"),
  description: yup.string().required("Please fill the description"),
  prerequisite: yup.string().required("Please fill the prerequisite"),
  testing_steps: yup.array().of(
    yup.object().shape({
      steps: yup.string().required("Please fill the testing_steps"),
    })
  ),
  expected_result: yup.string().required("Please fill the expected_result"),
  module: yup.string().required("Please select a module"),
});

const defaultValues = {
  title: "",
  description: "",
  module: "",
  prerequisite: "",
  testing_steps: [{ steps: "" }],
  expected_result: "",
};

function AddTestCases() {
  const [options, setOptions] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const { addtestcases } = router.query;

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

  const { fields, append, remove } = useFieldArray({
    name: "testing_steps",
    control,
  });
  useEffect(() => {
    fetchModules(auth.user.auth_token, addtestcases).then(({ data }) => {
      setOptions(
        data.map((module) => {
          return { label: module.title, value: module.id };
        })
      );
    });
  }, []);

  const onSubmit = (data) => {
    let payload = {
      test_case: {
        title: data.title,
        prerequisite: data.prerequisite,
        description: data.description,
        expected_result: data.expected_result,
        section_id: data.module,
        steps: data.testing_steps.map((testStep) => {
          return { description: testStep.steps };
        }),
      },
    };
    createTestCase(auth.user.auth_token, addtestcases, payload).then(
      ({ message }) => {
        toast.success(message);
        router.push(`/project/testcases/${addtestcases}`);
      }
    );
  };

  const handleSteps = () => {
    append({ steps: "" });
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: "5px 0" }}>Add Test Case</h3>
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.back()}
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
          spacing={5}
          columnSpacing={30}
          padding={"0 20px"}
          marginTop
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
                  autoFocus={true}
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
          <Grid item xs={6}>
            Modules
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="module"
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
                    error={Boolean(errors.module)}
                    helperText={errors.module ? errors.module.message : ""}
                    options={options}
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
                  helperText={errors.description && errors.description.message}
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
                  rows={3}
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
          {fields.map((testingStep, index) => (
            <Grid item xs={12} key={index}>
              {console.log(`testing_steps[${index}].steps`, "indexindex")}
              Testing Steps
              <Controller
                name={`testing_steps.${index}.steps`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    fullWidth
                    size={"small"}
                    placeholder={"Enter testing steps..."}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    errors={Boolean(errors.testing_steps)}
                    helperText={
                      errors.testing_steps &&
                      errors.testing_steps[index].steps.message
                    }
                  />
                )}
              />
            </Grid>
          ))}
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
      </form>
    </>
  );
}

export default AddTestCases;

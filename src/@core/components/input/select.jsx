import React from "react";
import { FormHelperText, Select, MenuItem, FormControl } from "@mui/material";

function SelectInput(props) {
  let {
    size,
    fullWidth,
    onBlur,
    error,
    helperText,
    value,
    label,
    options,
    onChange,
    defaultValue,
  } = props;
  console.log(Boolean(error), "Boolean(error)");
  return (
    <FormControl error>
      <Select
        size={size}
        fullWidth={fullWidth}
        onBlur={onBlur}
        onChange={onChange}
        error={Boolean(error)}
        value={value}
        defaultValue={defaultValue}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default SelectInput;

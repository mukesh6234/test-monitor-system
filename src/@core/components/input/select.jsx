import React from "react";
import { FormHelperText, Select, MenuItem } from "@mui/material";

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
  } = props;

  return (
    <>
      <Select
        size={size}
        fullWidth={fullWidth}
        onBlur={onBlur}
        onChange={onChange}
        error={Boolean(error)}
        value={value}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </>
  );
}

export default SelectInput;

import React from "react";
import { FormHelperText, Select , MenuItem,} from "@mui/material";

function SelectInput(props) {
  let {
    size,
    fullWidth,
    onBlur,
    error,
    helperText,
    value,
    placeholder,
    label,
    multiple,
    options,
    onChange,
  } = props;
  console.log(value,"value");
  return (
    <>
      <Select
        size={size}
        multiple={multiple}
        fullWidth={fullWidth}
        onBlur={onBlur}
        onChange={onChange}
        error={Boolean(error)}
        value={value}
        label={label}
        // renderValue={(selected) => {
        //   if (selected.length === 0) {
        //     return <em>{placeholder}</em>;
        //   }

        // //   return selected.join(", ");
        // }}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </>
  );
}
export default SelectInput;

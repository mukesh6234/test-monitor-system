import React from "react";
import { FormHelperText, Select, MenuItem, Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";

function MultiSelectInput(props) {
  let {
    size,
    fullWidth,
    onBlur,
    error,
    helperText,
    value,
    label,
    multiple,
    options,
    onChange,
    handleDelete,
  } = props;

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
        // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selected.map((value) => {
              let selectedValue = "";
              options.find((option) => {
                if (option.value === value) {
                  selectedValue = option.label;
                }
                return selectedValue;
              });
              return <Chip  key={value} label={selectedValue} onDelete={handleDelete}/>;
            })}
          </Box>
        )}
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

export default MultiSelectInput;

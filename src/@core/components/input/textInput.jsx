import React from "react";
import { TextField } from "@mui/material";

function TextInput(props) {
  let {
    size,
    name,
    value,
    errors,
    placeholder,
    onBlur,
    readOnly,
    disabled,
    length,
    multi,
    rows,
    autoFocus,
    onChange,
    helperText,
  } = props;

  return (
    <TextField
      fullWidth
      autoFocus={autoFocus}
      name={name}
      size={size}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      error={Boolean(errors)}
      helperText={helperText}
      readOnly={readOnly}
      disabled={disabled}
      multiline={multi}
      rows={multi ? rows : 0}
      inputProps={{
        maxLength: length,
      }}
    />
  );
}
export default TextInput;

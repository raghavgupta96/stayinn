import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const renderPasswordField = ({
  input,
  label,
  meta: { touched, error },
  errorMessage,
  ...custom
}) => (
  <div>
    {errorMessage && (
      <TextField
        error
        type="password"
        style={{ height: 50 }}
        label={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        fullWidth
      />
    )}
    {!errorMessage && (
      <TextField
        type="password"
        style={{ height: 50 }}
        label={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        fullWidth
      />
    )}
    <Typography color="error">{touched && error}</Typography>
  </div>
);

export default renderPasswordField;

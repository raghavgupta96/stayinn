import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const renderTextField = ({
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
    {console.log("Error: ", error)}
    {console.log("Error Message: ", errorMessage)}
  </div>
);

export default renderTextField;

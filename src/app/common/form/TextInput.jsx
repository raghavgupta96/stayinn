import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <div>
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
    <Typography color="error">{touched && error}</Typography>
  </div>
);

export default renderTextField;

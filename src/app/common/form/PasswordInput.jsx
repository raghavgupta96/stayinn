import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography'

const renderPasswordField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <TextField
      required
      style={{ paddingBottom: 10 }}
      type="password"
      label="Password"
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      margin="normal"
      fullWidth
    />
    <Typography color='error'>{touched && error}</Typography>
  </div>
);

export default renderPasswordField;

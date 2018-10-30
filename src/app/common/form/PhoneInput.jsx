import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";

const renderTextField = ({
    input,
    label,
    ...custom
  }) => (
    <TextField
      label="Phone Number"
      floatingLabelText="Phone Number"
      {...input}
      {...custom}
      margin="normal"
      fullWidth
    />
  );

const PhoneInput = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div>
    {/* <TextField
      style={{ height: 50}}
      label={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      margin="normal"
      fullWidth
    /> */}
    {/* <Typography color="error">{touched && error}</Typography> */}
    {/* <NumberFormat format="+1 (###) ###-####" /> */}
      <NumberFormat value={this.input} {...input} customInput={renderTextField} format="+1 (###) ###-####" />
  </div>
);

export default PhoneInput;

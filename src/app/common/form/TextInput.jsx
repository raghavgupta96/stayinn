import React from 'react'
import TextField from '@material-ui/core/TextField'

const renderTextField = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <TextField
   style={{height: 50}}
   label={label}
   floatingLabelText={label}
   errorText={touched && error}
   {...input}
   {...custom}
   margin="normal"
   fullWidth
   />
)



export default renderTextField
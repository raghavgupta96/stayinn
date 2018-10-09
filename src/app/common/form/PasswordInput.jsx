import React from 'react'
import TextField from '@material-ui/core/TextField'

const renderPasswordField = ({
    input, label, meta: { touched, error }, ...custom
  })=> (
    <TextField 
     required
     style={{paddingBottom: 10}}
     type="password"
     label="Password"
     hintText={label}
     floatingLabelText={label}
     errorText={touched && error}
     {...input}
     {...custom}
     margin="normal"
     fullWidth/>
  )

  export default renderPasswordField
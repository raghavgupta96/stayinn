import React from 'react'
import { Form, Label, TextField } from 'semantic-ui-react'
const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  FFS:{
    position: 'absolute',
    lineHeight: '1.5',
    top: '38',
    transition: 'none',
    zIndex: '1',
    transform: 'none',
    transformOrigin: 'none',
    pointerEvents: 'none',
    userSelect: 'none',
    fontSize: '16',
    color: 'rgba(0, 0, 0, 0.8)',
  }
};
 export const PhotoInput  = ({
                                  floatingLabelText,
                                  fullWidth,
                                  input,
                                  label,
                                  meta: { touched, error },
                                  ...custom })=>{
  if (input.value && input.value[0] && input.value[0].name) {
    floatingLabelText = input.value[0].name;
  }
  delete input.value;
  return (
    <TextField
      hintText={label}
      fullWidth={fullWidth}
      floatingLabelShrinkStyle={styles.FFS}
      floatingLabelText={floatingLabelText}
      inputStyle={styles.exampleImageInput}
      type="file"
      errorText={error}
      {...input}
      {...custom}
    />
  )
}
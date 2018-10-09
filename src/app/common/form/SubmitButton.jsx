import React from 'react';
import Button from '@material-ui/core/Button';

const renderLoginButton = ({
    ...custom
  }) => (
    <Button 
    variant="contained" 
    justify="right" 
    color="primary" 
    type="submit"
    {...custom}
    />
  )

export default renderLoginButton
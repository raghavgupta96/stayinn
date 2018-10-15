import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import SubmitButton from './SubmitButton';

let openSnackbarFn;

class NotifierBar extends Component {
    // 1. set the Notifier's initial state
    state = {
        open: false
    };
    // 2. define a function to open Snackbar and show a message
    openSnackbar = ({message}) => {
        this.setState({
            open: true,
            message,
        });
    };
    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    };
    // 3. define a function to close Snackbar when a user clicks away
    handleSnackbarClose = () => {
        this.setState({
        open: false,
        message: '',
        });
    };
    handleClick = () => {
        this.setState({ open: true });
        
      };
    
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
    
      this.setState({ open: false });
    };

  render() {
    // 4. Show a message to the user
    const message = (
        <span 
            id="snackbar-message-id"
            //dangerouslySetInnerHTML={{__html: this.state.message }}
        >Check yo email homie</span>
    )
    return (
        <div>
            <Button component={SubmitButton} onClick={this.handleClick}>Submit!</Button>
            <Snackbar
                // 5. Write styles and pass props to the snackbar component
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                message={message}
                autoHideDuration={3000}
                onClose={this.handleSnackbarClose}
                open={this.state.open}
                SnackbarContentProps={{
                    'aria-describesby': 'snackbar-message-id',
                }}
            />
        </div>
      
    );
  }
}

export function openSnackbar({ message }) {
    openSnackbarFn({ message });
}

export default NotifierBar;
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
//import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/core/CloseIcon';

const Notifier = ({
message
}) => (
    <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={true}
                autoHideDuration={100}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                style={{
                    padding: 10,
                }}
                message={<span id="message-id">{message}</span>}
                
            />
        </div>
);

export default Notifier;
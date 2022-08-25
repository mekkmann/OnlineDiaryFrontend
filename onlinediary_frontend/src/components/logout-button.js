import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const LogOutButton = () => {
    const { logout } = useAuth0();
    
    return(
        <Button variant="contained" color="error"  
            onClick={
                () => logout({
                    returnTo: window.location.origin,

                })
            }>
            Log Out
        </Button>
    );
};

export default LogOutButton;
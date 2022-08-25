import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
    const { loginWithRedirect } = useAuth0();
    return(
        <Button variant="contained" color="secondary" 
            onClick={
                () => loginWithRedirect({
                    screen_hint: 'signup',
                })
            }>
            Sign Up
        </Button>
    );
};

export default SignUpButton;

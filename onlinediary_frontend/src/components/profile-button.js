import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import "../App.css";

import { ThemeProvider } from '@emotion/react';

import ColorTheme from './color-theme';

const ProfileButton = () => {


    return (
        <ThemeProvider theme={ColorTheme}>
            <Link to="/profile" >
                <Button variant="outlined" color="primary" sx={{textDecoration: "none"}}>Profile</Button>
            </Link>
        </ThemeProvider>
    );
};

export default ProfileButton;
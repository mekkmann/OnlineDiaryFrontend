import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import ColorTheme from './color-theme';
import { ThemeProvider } from '@emotion/react';

const HomeButton = () => {


    return (
        <ThemeProvider theme={ColorTheme}>
            <NavLink to="/home">
                    <Button variant="outlined" color="primary" sx={{color: "black"}}>Home</Button>
            </NavLink>
        </ThemeProvider>
    );
};

export default HomeButton;
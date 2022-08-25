import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";

import { ThemeProvider } from '@emotion/react';

import ColorTheme from './color-theme';

const AddBookButton = () => {


    return (
        <ThemeProvider theme={ColorTheme}>
            <NavLink to="/addBook">
                <Button variant="outlined" color="primary">Add Book</Button>
            </NavLink>
        </ThemeProvider>
    );
};

export default AddBookButton;
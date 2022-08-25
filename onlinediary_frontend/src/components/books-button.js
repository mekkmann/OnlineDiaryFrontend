import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import ColorTheme from './color-theme';
import { ThemeProvider } from '@emotion/react';

const BooksButton = () => {


    return (
        <ThemeProvider theme={ColorTheme}>
            <NavLink to="/books">
                <Button variant="outlined" color='primary'>Books</Button>
            </NavLink>
        </ThemeProvider>
    );
};

export default BooksButton;
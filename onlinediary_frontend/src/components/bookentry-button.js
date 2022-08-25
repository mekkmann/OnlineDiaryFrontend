import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";

import { ThemeProvider } from '@emotion/react';

import ColorTheme from './color-theme';

const BookEntriesButton = ({book}) => {

    return (
        <ThemeProvider theme={ColorTheme}>
            <NavLink to={{pathname :"/bookEntries"}}
                     state={{id: book.id, title: book.title, book: book}}
                    >
                <Button variant="outlined" color="primary">Book Entries</Button>
            </NavLink>
        </ThemeProvider>
    );
};

export default BookEntriesButton;
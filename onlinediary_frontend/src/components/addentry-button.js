import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";

import { ThemeProvider } from '@emotion/react';

import ColorTheme from './color-theme';

const AddEntryButton = ({book}) => {

    return (
        <ThemeProvider theme={ColorTheme}>
            <NavLink to={{pathname :"/addEntries"}}
                    state={{id: book.id, title: book.title}}>

                <Button variant="outlined" color='primary'>Add Entry</Button>
            </NavLink>
        </ThemeProvider>
    );
};

export default AddEntryButton;
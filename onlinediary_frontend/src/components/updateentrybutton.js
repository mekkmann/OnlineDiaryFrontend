import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import "../App.css";

import { ThemeProvider } from '@emotion/react';

import ColorTheme from './color-theme';

const UpdateEntryButton = ({entry}) => {
    
    return (
        <ThemeProvider theme={ColorTheme}>
            <NavLink to={{pathname :"/updateBook"}}
                    state={{id: entry.id, text: entry.text, rating: entry.todaysRating}} >
                <Button variant="outlined" color="primary" sx={{textDecoration: "none"}}>Update</Button>
            </NavLink>
        </ThemeProvider>
        
    );
};

export default UpdateEntryButton;
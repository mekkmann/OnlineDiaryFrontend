import { createTheme } from '@mui/material/styles';

const ColorTheme = createTheme({
    status: {
        danger: '#e53e3e',
      },
      palette: {
        primary: {
          main: '#000000',
          darker: '#053e85',
        },
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
      },
    });

export default ColorTheme;
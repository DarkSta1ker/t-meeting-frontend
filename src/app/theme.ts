import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFDD2D',
            contrastText: '#000',
        },
        background: {
            default: '#F6F7F8',
        },
        text: {
            primary: '#1f1f1f',
        },
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
});

import CircularProgress from '@mui/material/CircularProgress'
import {type FC} from 'react';
export const Loader : FC = () => {
    return (
        <>
            <CircularProgress sx={{color:"yellow"}}/>
        </>
    );
};

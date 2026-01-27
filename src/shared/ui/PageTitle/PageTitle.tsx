import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
interface PageTitleProps {
    children: React.ReactNode;
}
export const PageTitle: FC<PageTitleProps> = ({children}) => {
    return(
        <Typography
            variant='h5'
            sx={{
                alignItems: 'center',
                display: 'flex',
                height: '64px',
            }}
        >{children}</Typography>
    );
}
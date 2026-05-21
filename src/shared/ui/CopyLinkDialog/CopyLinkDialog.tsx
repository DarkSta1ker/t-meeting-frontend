import {Dialog, DialogContent, DialogTitle, IconButton, TextField} from '@mui/material';
import {X} from 'lucide-react';
import React, {FC, useRef} from 'react';

interface CopyLinkDialogProps {
    open: boolean;
    link: string;
    onClose: () => void;
}

export const CopyLinkDialog: FC<CopyLinkDialogProps> = ({open, link, onClose}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                Ссылка на мероприятие
                <IconButton onClick={onClose} size="small" sx={{color: 'black'}}>
                    <X size={20}/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={inputRef}
                    value={link}
                    fullWidth
                    onFocus={(e) => e.target.select()}
                    InputProps={{readOnly: true}}
                    sx={{
                        mt: 1,
                        '& .MuiInputLabel-root.Mui-focused': {color: '#000000'},
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

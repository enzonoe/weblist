import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Box, Button, Stack } from "@mui/material";

export default function AddRow({ onAddRow, onRemoveRow }) { // Add onRemoveRow prop
    return (
        <React.Fragment>
            <Title>Add Item</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Add or remove items from the list
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <Button variant="contained" onClick={onAddRow}>
                    Add Row
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="outlined" onClick={onRemoveRow}>
                    Remove Last Row
                </Button>
            </Box>

        </React.Fragment >
    );
}
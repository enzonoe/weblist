import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button, Stack } from "@mui/material";

export default function AddRow({ onAddRow, onRemoveRow }) { // Add onRemoveRow prop
    return (
        <React.Fragment>
            <Title>Add Item</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Add or remove items from the list
            </Typography>
            <Stack direction="row" spacing={2}> {/* Use Stack for button layout */}
                <Button variant="contained" onClick={onAddRow}>
                    Add Row
                </Button>
                <Button variant="outlined" onClick={onRemoveRow}>
                    Remove Last Row
                </Button>
            </Stack>
        </React.Fragment>
    );
}
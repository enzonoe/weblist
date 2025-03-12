import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";
import { Box } from '@mui/material';

export default function ToggleCheck({ selectedItem, onToggleCheck }) {
    const handleCheckClick = () => {
        if (selectedItem) {
            // Call the onToggleCheck function passed from the parent
            onToggleCheck(selectedItem);
        }
    };

    return (
        <React.Fragment>
            <Title>Check/Uncheck List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {selectedItem ? `Selected: ${selectedItem.content}` : "No item selected"}
            </Typography>
            <Button
                variant="contained"
                onClick={handleCheckClick}
                disabled={!selectedItem} // Disable if no item is selected
            >
                {selectedItem?.checked ? "Uncheck" : "Check"}
            </Button>
        </React.Fragment>
    );
}
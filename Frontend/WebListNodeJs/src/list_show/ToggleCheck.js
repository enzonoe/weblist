import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";
import { Box } from '@mui/material';

export default function ToggleCheck({ selectedItem, item, onToggleSuccess }) {
    const handleCheckClick = () => {
        if (selectedItem && item) {
            // Call the API to toggle the checked status
            fetch(`http://localhost:5000/lists/${item}/${selectedItem.id}`, {
                method: 'PUT',
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Toggled checked status:', data);

                    // Notify the parent component of the successful toggle
                    if (onToggleSuccess) {
                        onToggleSuccess({ ...selectedItem, checked: !selectedItem.checked });
                    }
                })
                .catch(error => console.error('Error toggling checked status:', error));
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
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";
import { Box } from '@mui/material';

export default function ToggleCheck({ selectedItem, item, refreshData }) {
    React.useEffect(() => {
        console.log('Selected Item in ToggleCheck:', selectedItem); // Log the selected item
    }, [selectedItem]);

    const handleCheckClick = () => {
        if (selectedItem && item) {
            const contentId = selectedItem.content_id;
            console.log('Content ID:', contentId); // Log the content_id

            fetch(`http://localhost:5000/lists/${item}/${contentId}`, {
                method: 'PUT',
            })
                .then(response => response.json())
                .then(data => {
                    //console.log('Toggled checked status:', data);
                    if (refreshData) {
                        refreshData();
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
                disabled={!selectedItem}
            >
                {selectedItem?.checked ? "Uncheck" : "Check"}
            </Button>
        </React.Fragment>
    );
}
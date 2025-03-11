import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddOrDeleteList({ onDeleteList }) {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleCreateList = () => {
        navigate('/CreateList'); // Navigate to the /CreateList route
    };

    return (
        <React.Fragment>
            <Title>Create/Delete List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Leads to list creation form or deletes selected List
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <Button variant="contained" onClick={handleCreateList}>
                    Create
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="outlined" onClick={onDeleteList}>
                    Delete
                </Button>
            </Box>
        </React.Fragment>
    );
}
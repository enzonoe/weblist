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
            <Title>Check/Uncheck List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Checks or unchecks the task in the list
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <Button variant="contained" onClick={handleCreateList}>
                    Check
                </Button>
            </Box>
        </React.Fragment>
    );
}
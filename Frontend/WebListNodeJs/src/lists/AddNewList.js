import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AddNewList() {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleCreateList = () => {
        navigate('/CreateList'); // Navigate to the /CreateList route
    };

    return (
        <React.Fragment>
            <Title>Create New List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Creates new List in Database
            </Typography>
            <Button variant="contained" onClick={handleCreateList}>
                Create
            </Button>
        </React.Fragment>
    );
}
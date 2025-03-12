import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";

export default function ShowSelectedList({ selectedList }) {
    const navigate = useNavigate();

    console.log("Selected List in ShowSelectedList:", selectedList); // Debugging

    const handleShowClick = () => {
        if (selectedList) {
            navigate(`/Lists/Show/${selectedList}`);
        } else {
            alert("No list selected!");
        }
    };

    return (
        <React.Fragment>
            <Title>Show List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {selectedList ? `Selected List: ${selectedList}` : "No list selected"}
            </Typography>
            <Button variant="contained" onClick={handleShowClick} disabled={!selectedList}>
                Show
            </Button>
        </React.Fragment>
    );
}
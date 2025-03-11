import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";


//TODO make button create new list
export default function AddNewList() {
    return (
        <React.Fragment>
            <Title>Create New List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Creates new List in Database
            </Typography>
            <Button variant="contained">Create</Button>
        </React.Fragment>
    );
}
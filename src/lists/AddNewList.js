import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import {Button} from "@mui/material";

function preventDefault(event) {
    event.preventDefault();
}

export default function AddNewList() {
    return (
        <React.Fragment>
            <Title>Create New List</Title>
            <Typography color="text.secondary" sx={{flex: 1}}>
                Creates new List in Database
            </Typography>
            <Button variant="contained">Create</Button>
        </React.Fragment>
    );
}
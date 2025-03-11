import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";


//TODO make button create new list
export default function ShowSelectedList() {
    return (
        <React.Fragment>
            <Title>Show List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Show selected List
            </Typography>
            <Button variant="contained">Show</Button>
        </React.Fragment>
    );
}
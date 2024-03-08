import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";

function preventDefault(event) {
    event.preventDefault();
}

export default function ListTotal() {
    return (
        <React.Fragment>
            <Title>Add New List</Title>
            <Typography component="p" variant="h4">
                11
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                and 153 Tasks
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View details
                </Link>
            </div>
        </React.Fragment>
    );
}
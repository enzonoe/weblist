import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Title from "../other/Title";
import { Button } from "@mui/material";
import { Box } from '@mui/material';

export default function SearchList({ onSearch }) {
    const [searchText, setSearchText] = React.useState('');

    const handleSearch = () => {
        onSearch(searchText); // Pass the search text to the parent component
    };

    return (
        <React.Fragment>
            <Title>Search List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Search a specific lists and display on table
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <TextField
                    id="outlined-basic"
                    label="List Name"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} // Update search text
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </Box>
        </React.Fragment>
    );
}
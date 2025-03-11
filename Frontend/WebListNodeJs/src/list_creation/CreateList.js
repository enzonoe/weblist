import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from "../other/Title";
import { Button } from "@mui/material";

export default function CreateList({ listName, description, rows }) {
    const handleCreateList = async () => {
        const contents = rows.map(row => row.value).filter(value => value.trim() !== ''); // Extract non-empty row values

        if (!listName || !description || contents.length === 0) {
            alert('Please fill in all fields and add at least one item.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    list_name: listName,
                    list_description: description,
                    contents: contents,
                }),
            });

            if (response.ok) {
                alert('List created successfully!');
                // Optionally, you can reset the form or navigate to another page
            } else {
                const errorData = await response.json();
                alert(`Failed to create list: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error creating list:', error);
            alert('An error occurred while creating the list.');
        }
    };

    return (
        <React.Fragment>
            <Title>Create List</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Create list and send to database
            </Typography>
            <Button variant="contained" onClick={handleCreateList}>
                Create
            </Button>
        </React.Fragment>
    );
}
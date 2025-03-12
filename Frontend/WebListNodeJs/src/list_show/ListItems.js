import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'content', headerName: 'Content', width: 280 },
    { field: 'checked', headerName: 'Checked', width: 120 },
];

export default function ListItems({ item }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (item) {
            fetch(`http://localhost:5000/${item}`)
                .then(response => response.json())
                .then(data => {
                    if (data.contents && Array.isArray(data.contents)) {
                        const transformedData = data.contents.map((entry, index) => ({
                            id: index + 1,
                            content: entry.content,  // Correct key from API response
                            checked: entry.checked ? "Yes" : "No", // Convert checked to Yes/No
                        }));
                        setRows(transformedData);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [item]);

    return (
        <Box sx={{ height: 640, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} checkboxSelection />
        </Box>
    );
}

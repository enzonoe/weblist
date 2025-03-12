import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'listName', headerName: 'List name', width: 220 },
    { field: 'description', headerName: 'Description', width: 280 },
    { field: 'creationDate', headerName: 'Creation Date', width: 100 },
    { field: 'lastChanged', headerName: 'Last Changed', width: 100 },
];

export default function ListTable({ searchText, onDeleteList }) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null); // Track selected row

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/')
            .then(response => response.json())
            .then(data => {
                // Transform the fetched data into the rows format
                const transformedData = Object.entries(data).map(([listName, listData], index) => ({
                    id: index + 1, // Unique ID for each list
                    listName: listName,
                    description: listData.list_description, // Use the list_description field
                    creationDate: new Date(listData.creation_date).toLocaleDateString(),
                    lastChanged: new Date(listData.last_changed).toLocaleDateString(),
                }));
                setRows(transformedData);
                setFilteredRows(transformedData); // Initialize filtered rows
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Filter rows based on search text
        if (searchText) {
            const filtered = rows.filter(row =>
                row.listName.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows); // Reset to all rows if search text is empty
        }
    }, [searchText, rows]);

    // Handle row selection
    const handleRowSelection = (selection) => {
        if (selection.length > 0) {
            const selectedId = selection[0];
            const selectedRow = filteredRows.find(row => row.id === selectedId);
            setSelectedRow(selectedRow);
        } else {
            setSelectedRow(null);
        }
    };

    return (
        <div style={{ height: 640, width: '100%' }}>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                components={{
                    pagination: () => null, // Hides the pagination controls
                }}
                checkboxSelection
                onSelectionModelChange={handleRowSelection} // Track selected row
            />
            {selectedRow && (
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onDeleteList(selectedRow.listName)} // Pass listName, not the entire row
                    >
                        Delete Selected List
                    </Button>
                </Box>
            )}
        </div>
    );
}
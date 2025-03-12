import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'listName', headerName: 'List name', width: 220 },
    { field: 'description', headerName: 'Description', width: 280 },
    { field: 'creationDate', headerName: 'Creation Date', width: 100 },
    { field: 'lastChanged', headerName: 'Last Changed', width: 100 },
];

export default function ListTable({ searchText, onSelectList }) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/')
            .then(response => response.json())
            .then(data => {
                const transformedData = Object.entries(data).map(([listName, listData], index) => ({
                    id: index + 1,
                    listName: listName,
                    description: listData.list_description,
                    creationDate: new Date(listData.creation_date).toLocaleDateString(),
                    lastChanged: new Date(listData.last_changed).toLocaleDateString(),
                }));
                setRows(transformedData);
                setFilteredRows(transformedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (searchText) {
            const filtered = rows.filter(row =>
                row.listName.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows);
        }
    }, [searchText, rows]);

    const handleRowClick = (params) => {
        console.log("Row clicked:", params.row); // Debugging
        onSelectList(params.row.listName); // Pass the selected list name to the parent
    };

    return (
        <div style={{ height: 640, width: '100%' }}>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                onRowClick={handleRowClick} // Use onRowClick instead of onSelectionModelChange
            />
        </div>
    );
}
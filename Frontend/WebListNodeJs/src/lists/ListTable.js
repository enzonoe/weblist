import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'listName', headerName: 'List name', width: 220 },
    { field: 'description', headerName: 'Description', width: 280 },
    { field: 'creationDate', headerName: 'Creation Date', width: 100 },
    { field: 'lastChanged', headerName: 'Last Changed', width: 100 },
];

export default function DataTable() {
    const [rows, setRows] = useState([]);

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
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ height: 640, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                components={{
                    pagination: () => null, // Hides the pagination controls
                }}
            />
            {/* if one value is selected -> then display "edit", "alter" and "delete"*/}
        </div>
    );
}
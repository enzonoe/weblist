import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'content', headerName: 'Content', width: 280 },
    { field: 'checked', headerName: 'Checked', width: 120, type: 'boolean' },
];

export default function ListItems({ item, onSelectItem }) {
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        if (item) {
            fetch(`http://localhost:5000/${item}`)
                .then(response => response.json())
                .then(data => {
                    if (data.contents && Array.isArray(data.contents)) {
                        const transformedData = data.contents.map((entry, index) => ({
                            id: index + 1,
                            content: entry.content,
                            checked: entry.checked,
                        }));
                        setRows(transformedData);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [item]);

    const handleRowClick = (params) => {
        setSelectedRow(params.row); // Update the selected row
        onSelectItem(params.row); // Pass the selected row to the parent
    };

    return (
        <div style={{ height: 640, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick} // Use onRowClick to handle row selection
            />
        </div>
    );
}
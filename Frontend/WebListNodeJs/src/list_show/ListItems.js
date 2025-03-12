import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'content', headerName: 'Content', width: 280 },
    { field: 'checked', headerName: 'Checked', width: 120, type: 'boolean' },
];

export default function ListItems({ rows, onSelectItem }) {
    const handleRowClick = (params) => {
        //console.log('Selected Row:', params.row); // Log the selected row
        onSelectItem({
            id: params.row.id,
            content_id: params.row.content_id, // Ensure content_id is included
            content: params.row.content,
            checked: params.row.checked,
        });
    };

    return (
        <div style={{ height: 640, width: '100%' }}>
            <DataGrid
                rows={rows}  // Ensure rows is passed correctly
                columns={columns}
                onRowClick={handleRowClick} // Use onRowClick to handle row selection
                pageSize={5} // Optional: set a page size to limit the number of rows per page
            />
        </div>
    );
}
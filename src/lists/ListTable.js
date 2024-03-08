import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'taskName', headerName: 'Task name', width: 200 },
    { field: 'description', headerName: 'Description', width: 240 },
];

const rows = [
    { id: 1, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 2, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 3, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 4, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 5, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 6, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 7, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 8, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 9, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 10, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 11, taskName: 'Grocerie List', description: 'List of my groceries'},
    { id: 12, taskName: 'Grocerie List', description: 'List of my groceries'},
];

export default function DataTable() {
    return (
        <div style={{ height: 640, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </div>
    );
}
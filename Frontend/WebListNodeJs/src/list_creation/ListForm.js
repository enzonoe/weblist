import React from 'react';
import { TextField, Grid, Paper, Typography, Box } from '@mui/material';

export default function ListForm({ rows, onRowChange, listName, description, onListNameChange, onDescriptionChange }) {
    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 670 }}>
            <Typography variant="h6" gutterBottom>
                Create New List
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="List Name"
                            variant="outlined"
                            value={listName}
                            onChange={(e) => onListNameChange(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Grid inside a grid for additional text fields */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Grid container spacing={2}>
                    {rows.map((row) => (
                        <Grid item xs={12} key={row.id}>
                            <TextField
                                fullWidth
                                label={`Item ${row.id}`}
                                variant="outlined"
                                value={row.value}
                                onChange={(e) => onRowChange(row.id, e.target.value)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
}
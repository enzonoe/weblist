import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../other/Title';

// Generate Order Data
function createData(id, date, name, checked, unchecked, amount) {
    return {id, date, name, checked, unchecked, amount};
}

// TODO: Make the Data be recently altered lists
const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Task List',
        '25',
        '5',
        30,
    ),
    createData(
        1,
        '15 Mar, 2019',
        'Groceries',
        '9',
        '1',
        10,
    ),
    createData(
        2,
        '14 Mar, 2019',
        'Watchlist',
        '905',
        '350',
        1255
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function ShortList() {
    return (
        <React.Fragment>
            <Title>Recent Lists</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Checked Tasks</TableCell>
                        <TableCell>Unchecked Tasks</TableCell>
                        <TableCell align="right">Total Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.checked}</TableCell>
                            <TableCell>{row.unchecked}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{mt: 3}}>
                See all lists
            </Link>
        </React.Fragment>
    );
}
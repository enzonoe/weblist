import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../other/Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function ListTotal() {
    const [totalLists, setTotalLists] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Calculate total number of lists
                const listCount = Object.keys(data).length;
                setTotalLists(listCount);

                // Calculate total number of tasks
                let taskCount = 0;
                Object.values(data).forEach(list => {
                    taskCount += list.contents.length;
                });
                setTotalTasks(taskCount);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <React.Fragment>
            <Title>List Total</Title>
            <Typography component="p" variant="h4">
                {totalLists}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                and {totalTasks} Tasks
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View details
                </Link>
            </div>
        </React.Fragment>
    );
}
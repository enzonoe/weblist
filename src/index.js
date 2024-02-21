import React from 'react';
import ReactDOM from 'react-dom';
import './dashboard/index.css'; // Import the CSS file for styling
import Dashboard from './Dashboard'; // Import the Dashboard component

ReactDOM.render(
    <React.StrictMode>
        <Dashboard /> {/* Render the Dashboard component */}
    </React.StrictMode>,
    document.getElementById('root') // Render it to the root element
);
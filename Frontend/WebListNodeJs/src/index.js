import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './dashboard/index.css';
import Dashboard from './Dashboard';
import Lists from './Lists';
import ListCreation from './ListCreation';
import Contents from './ListContents';
import ListShow from './ListShow';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the app
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* Ensure Lists is properly imported and used */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/Lists" element={<Lists />} />
                <Route path="/Lists/Show" element={<ListShow />} />
                <Route path="/CreateList" element={<ListCreation />} />
                <Route path="/Lists/Contents" element={<Contents />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
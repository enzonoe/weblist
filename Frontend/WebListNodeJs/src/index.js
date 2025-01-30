import React from 'react';
import ReactDOM from 'react-dom';
import './dashboard/index.css';
import Dashboard from './Dashboard';
import Lists from './Lists';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/Lists" element={<Lists/>}/> {/* Ensure Lists is properly imported and used */}
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

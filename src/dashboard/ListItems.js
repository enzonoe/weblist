import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import GitHubIcon from '@mui/icons-material/GitHub';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <ListIcon/>
            </ListItemIcon>
            <ListItemText primary="Lists"/>
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        {/*
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        */}
        <ListItemButton>
            <ListItemIcon>
                <GitHubIcon/>
            </ListItemIcon>
            <ListItemText primary="GitHub Repo"/>
        </ListItemButton>
    </React.Fragment>
);
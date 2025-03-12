import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from "@mui/material/Typography";
import { mainListItems, secondaryListItems } from './dashboard/ListItems';
import { Divider, List, Paper } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ListItems from "./list_show/ListItems";
import ToggleCheck from "./list_show/ToggleCheck";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function ListShow() {
    const { item } = useParams(); // Get "item" from URL
    const [open, setOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Track the selected item

    const toggleDrawer = () => setOpen(!open);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        setTheme(createTheme({
            palette: {
                mode: !isDarkMode ? 'dark' : 'light',
                primary: { main: '#04cc07' },
                secondary: { main: '#f50057' },
            },
        }));
    };

    const [theme, setTheme] = useState(() => createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: { main: '#04cc07' },
            secondary: { main: '#f50057' },
        },
    }));

    const handleToggleSuccess = (updatedItem) => {
        setSelectedItem(updatedItem);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Lists - {item} {/* Show the current list item */}
                        </Typography>
                        <IconButton color="inherit" onClick={toggleTheme}>
                            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', marginTop: '64px' }}>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 670 }}>
                                    {/* Pass "item" and "onSelectItem" as props */}
                                    <ListItems item={item} onSelectItem={setSelectedItem} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                                    {/* Pass the selected item, item, and onToggleSuccess function */}
                                    <ToggleCheck
                                        selectedItem={selectedItem}
                                        item={item}
                                        onToggleSuccess={handleToggleSuccess}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
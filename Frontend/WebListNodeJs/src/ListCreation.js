import React, { useState } from 'react';
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
import { Divider, List } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Paper from "@mui/material/Paper";
import AddRow from "./list_creation/AddRow";
import ListForm from "./list_creation/ListForm";
import CreateList from './list_creation/CreateList';

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

const drawerWidth = 240;

export default function Lists() {
    const [open, setOpen] = React.useState(true);
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = useState([{ id: 1, value: '' }]); // State for dynamic rows
    const [listName, setListName] = useState(''); // State for list name
    const [description, setDescription] = useState(''); // State for description

    // Add a new row
    const addRow = () => {
        const newRow = { id: rows.length + 1, value: '' };
        setRows([...rows, newRow]);
    };

    // Remove the last row
    const removeRow = () => {
        if (rows.length > 1) { // Ensure at least one row remains
            const updatedRows = rows.slice(0, -1); // Remove the last row
            setRows(updatedRows);
        }
    };

    // Handle input change for dynamic rows
    const handleRowChange = (id, value) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, value } : row
        );
        setRows(updatedRows);
    };

    // Handle list name change
    const handleListNameChange = (value) => {
        setListName(value);
    };

    // Handle description change
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleTheme = () => {
        setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
        const newTheme = createTheme({
            palette: {
                mode: !isDarkMode ? 'dark' : 'light',
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#f50057',
                },
            },
        });
        setTheme(newTheme);
    };

    const [theme, setTheme] = useState(() => createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#f50057',
            },
        },
    }));

    const handleSearch = (text) => {
        setSearchText(text); // Update search text
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="toggle dark mode"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
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
                            {/* ListTable */}
                            <Grid item xs={12} md={8} lg={9}>
                                <ListForm
                                    rows={rows}
                                    onRowChange={handleRowChange}
                                    listName={listName}
                                    description={description}
                                    onListNameChange={handleListNameChange}
                                    onDescriptionChange={handleDescriptionChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        mb: 3,
                                    }}
                                >
                                    <AddRow onAddRow={addRow} onRemoveRow={removeRow} />
                                </Paper>

                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        mb: 3,
                                    }}
                                >
                                    <CreateList
                                        listName={listName}
                                        description={description}
                                        rows={rows}
                                    />
                                </Paper>
                            </Grid>
                            {/* Other Components */}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
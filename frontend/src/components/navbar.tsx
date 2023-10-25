import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" color='success'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Poems Finder
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

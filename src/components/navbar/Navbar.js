import React from 'react';
import classes from './Navbar.module.scss';

function Navbar() {
    return (
        <div className={classes.nav}>
            <div className={classes.nav_heading}>
                Minesweeper
            </div>
        </div>
    )
}

export default Navbar

import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerClass: {
      flexGrow: 1,
    },
    title:{
        flexGrow: 1,
    }
  }));
function Header()
{
    const classes = useStyles();
    return(
        <div className={classes.headerClass}>
           
            <AppBar position='relative' color='secondary'>
             <Toolbar>
                <Typography variant="h3"  className={classes.title}>
                    XMeme
                </Typography>
             </Toolbar>
            </AppBar>

        </div>
    )

}

export default Header;
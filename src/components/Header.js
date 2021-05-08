import React, { useState } from "react"
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'white',
    },
  }));

function Header() {

    const classes = useStyles();
    const [ message, setMessage ] = useState(false)

    const switchTheme = (e) => {
        const invertedNodes = document.querySelectorAll('.inverted')
        document.body.classList.toggle('inverted-theme')
        invertedNodes.forEach(node => node.classList.toggle('inverted-theme'))
        setMessage(!message) 
    }

    return (
        <AppBar position="static" className="inverted-theme">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <img 
                        className="inverted inverted-theme"
                        src="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png" 
                        // src="http://assets.stickpng.com/images/580b585b2edbce24c47b2a2f.png"
                        alt="Problem?"
                        height="50px"
                        width="50px"
                    />
                </Typography>
                <Typography variant="h5" className={classes.title}>
                    <p>Meme Generator</p>
                </Typography>
                <Typography variant="h6">
                <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" onChange={switchTheme}/>
                    <div className="slider round"></div>
              </label>

                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
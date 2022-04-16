import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import decode from 'jwt-decode';
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';


const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token)
            // if (decodedToken.exp * 1000 < Date.now()) 
            if (decodedToken.exp * 1000 < new Date().getTime()) 
                handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/');
    }

    return (
        <AppBar className={classes.appBar} 
                           position="static" 
                           color="inherit"
        >
            <div className={classes.brandContainer}>
                <Typography className={classes.heading}
                                      component={Link}
                                        to="/"
                                        variant="h2" 
                                        align="center"
                >
                    Memories
                </Typography>
                <img className={classes.image} 
                            src={memories} 
                            alt="icon" 
                            height="60" 
                />
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (   
                    <div className={classes.profile}>
                        <Avatar className={classes.purple}
                                      src={user.result.imageUrl}
                                      alt={user.result.name}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName}
                                              variant="h6"
                        >
                            {user.result.name}
                        </Typography>
                        <Button className={classes.logout}
                                      variant="contained"
                                      color="secondary"
                                      onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link}
                                  to="/auth"
                                  variant="contained"
                                  color="primary"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
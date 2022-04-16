import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './components/navBar/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import PostDetails from './components/postDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    
    return (
        <Router>
            <Container maxWidth="xl">
                <NavBar />
                <Switch>
                    <Route path="/" 
                                exact 
                                component={() => <Redirect to='/posts' />} 
                    />
                    <Route path="/posts" 
                                exact 
                                component={Home} 
                    />
                    <Route path="/posts/search" 
                                exact 
                                component={Home} 
                    />
                    <Route path="/posts/:id" 
                                component={PostDetails} 
                    />
                    <Route path="/auth" 
                                exact 
                                component={() => (!user ? <Auth /> : <Redirect to='/post' />)} 
                    />
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
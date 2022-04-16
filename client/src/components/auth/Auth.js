import React, { useState } from 'react'
import { Avatar, Typography, Button, Paper, Grid, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
// import useDarkMode from 'use-dark-mode';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth.js';

const initialState = { firstName: '', 
                                 lastName: '', 
                                 email: '', 
                                 password: '', 
                                 confirmPassword: '',
                                 // imageUrl: '' 
};

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
        /*
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const imageUrl = e.target.imageUrl.value;
        const isSignUp = e.target.isSignUp.value;
        const data = { email, password, name, imageUrl, isSignUp };
        dispatch({ type: 'LOGIN', data });
        history.push('/');
        */
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        // isSignUp ? setIsSignUp(false) : setIsSignUp(true);
        // setIsSignUp(!isSignUp);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('Google Login Failed, Try Again');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {String(isSignUp ? 'Sign Up' : 'Sign In')}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name="firstName" 
                                            label="Firstst Name"
                                            handleChange={handleChange}
                                            autoFocus
                                            half         
                                />
                                <Input name="lastName" 
                                            label="Last Name"
                                            handleChange={handleChange}
                                            half         
                                />
                            </>
                        )}
                        <Input name="email" 
                                    label="Email Address"
                                    handleChange={handleChange}
                                    type="email"
                        />
                        <Input name="password"
                                    label="Password"
                                    handleChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    handleShowPassword={handleShowPassword}
                        />
                        { isSignUp && 
                            <Input name="confirmPassword" 
                                        label="Repeat Password" 
                                        handleChange={handleChange}
                                        type={showPassword ? 'text' : 'password'}
                                        handleShowPassword={handleShowPassword}
                            /> 
                        }
                    </Grid>
                    <Button type="submit" 
                                fullWidth 
                                variant="contained" 
                                color="primary" 
                                className={classes.submit}
                    >
                        {String(isSignUp ? 'Sign Up' : 'Sign In')}
                    </Button>
                    {/* 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 */}
                    <GoogleLogin clientId="209941232929-rtlk74embsn5359rc7fh6hku8vut5ue8.apps.googleusercontent.com"
                                            render={(renderProps) => (
                                                    <Button className={classes.googleButton}
                                                                color="primary"
                                                                fullWidth
                                                                onClick={renderProps.onClick}
                                                                disabled={renderProps.disabled}
                                                                startIcon={<Icon />}
                                                                backgroundColor="blue"
                                                    >
                                                        Sign in with Google
                                                    </Button>
                                            )}
                                            onSuccess={googleSuccess}
                                            onFailure={googleFailure}
                                            cookiePolicy='single_host_origin'
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {String(isSignUp ? 'Already have an account?  Sign In' : 'Don\'t have an account?   Sign Up')}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
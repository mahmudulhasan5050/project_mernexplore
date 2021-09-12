import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import {signin, signup} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();


    const handleShowPassword = () => setShowPassword((prevPassword) => !prevPassword)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        setIsSignup((prevSignup) => !prevSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // "?." is used to get only 'undefined' if res object is not exist
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', payload: { result, token } });

            history.push('/'); // history is property of react router dom
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sign In unsuccessful')
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half></Input>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half></Input>
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus></Input>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} ></Input>
                        {isSignup &&
                            (<Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'></Input>)
                        }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='94169553575-er8ol2htg2ce3l6m3fng0h8vb7quiv10.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained' >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin' />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : 'Do not have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

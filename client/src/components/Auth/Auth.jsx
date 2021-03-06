import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { gapi } from 'gapi-script';
import env from "react-dotenv"

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import { loginUser, asyncSignUp, asyncSignIn } from '../../redux/authSlice'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

function Auth() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isSignup, setIsSignup] = React.useState(false)
    const [formData, setFormData] = React.useState(initialState)
    const [showPassword, setShowPassword] = React.useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup) {
            dispatch(asyncSignUp({ formData, navigate }))
        } else {
            dispatch(asyncSignIn({ formData, navigate }))
        }
    }

    React.useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, [])

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch(loginUser({ result, token }))
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = (err) => console.log('Google Sing In was unsuccessful. Try Again Later', err)


    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        }
                        <Input name='email' label='Email Adress' handleChange={handleChange} type="email" />
                        <Input name='password' label='Password' handleChange={handleChange} handleShowPassword={handleShowPassword}
                            type={showPassword ? 'text' : 'password'} />
                        {
                            isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                        }
                    </Grid>
                    <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId={process.env.REACT_APP_CLIENT_ID} render={(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick}
                            disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In
                        </Button>
                    )} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin" />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

// 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
import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import { signup, signin } from '../../redux/authSlice'

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
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const googleSuccess = async (res) => console.log(res)
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
                    <GoogleLogin clientId='353142932741-eaiv49iopfaa1i8lniq7nrdemdr07gfr.apps.googleusercontent.com' render={(renderProps) => (
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
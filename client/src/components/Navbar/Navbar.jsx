import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'

import useStyles from './styles'
import memories from '../../images/memories.png'
import { logoutUser } from '../../redux/authSlice'

function Navbar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')))

    React.useEffect(() => {
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch(logoutUser())
        navigate('/')
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant='contained' color="primary">Sign in</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
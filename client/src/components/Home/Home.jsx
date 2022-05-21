import React from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts } from '../../redux/postSlice';
import useStyles from './styles'

function Home() {

    const [currentId, setCurrentId] = React.useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    // }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
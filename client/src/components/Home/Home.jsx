import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts, getPostsBySearch } from '../../redux/postSlice';
import useStyles from './styles'
import Paginations from '../Paginations';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {

    const [currentId, setCurrentId] = React.useState(null)
    const [search, setSearch] = React.useState('')
    const [tags, setTags] = React.useState([])
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    React.useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    // }, [currentId, dispatch])

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

    return (
        <Grow in>
            <Container>
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant='outlined'
                            />
                            <Button onClick={searchPost} variant='contained' className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {/* <Paper elevation={6}>
                            <Paginations page={page} />
                        </Paper> */}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
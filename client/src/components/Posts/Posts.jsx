import React from 'react'
import { useSelector } from 'react-redux'

import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'
import useStyles from './styles'

function Posts({ setCurrentId }) {
    const classes = useStyles()
    const { posts, isLoading } = useSelector(state => state.posts)

    if (!posts.length && !isLoading) return 'no posts'
    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid item key={post._id} xs={12} sm={12} md={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
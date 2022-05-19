import React from 'react'
import moment from 'moment'

import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { deletePosts, likePost } from '../../../redux/postSlice'
import { useDispatch } from 'react-redux'

function Post({ post, setCurrentId }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} src={post.selectedFile} title={post.title} component="img" alt={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags && post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' gutterBottom >{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize='small' />&nbsp;Like&nbsp;{post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => { dispatch(deletePosts(post._id)) }}>
                    <DeleteIcon fontSize='small' /> Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
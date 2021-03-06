import React from 'react'
import moment from 'moment'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { deletePosts, likePost } from '../../../redux/postSlice'

function Post({ post, setCurrentId }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [likes, setLikes] = React.useState(post?.likes)
    const userId = user?.result?.googleId || user?.result?._id
    const hasLikedPost = post.likes.find((like) => like === userId)

    const handleLike = async () => {
        dispatch(likePost(post._id))
        if (hasLikedPost) {
            setLikes(post.likes.filter(id => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.image} src={post.selectedFile} title={post.title} component="img" alt={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {
                (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )
            }
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags && post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' gutterBottom >{post.message}</Typography>
            </CardContent>
            <Button variant="contained" color="primary" style={{ margin: '0 10px' }} onClick={openPost}>Open Post</Button>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={() => { dispatch(deletePosts(post._id)) }}>
                            <DeleteIcon fontSize='small' /> Delete
                        </Button>
                    )
                }
            </CardActions>
        </Card>
    )
}

export default Post
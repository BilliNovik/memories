import React from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPost } from '../../../redux/postSlice'

function CommentSection({ post }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [comments, setComments] = React.useState(post?.comments)
    const [comment, setComment] = React.useState('')
    const user = JSON.parse(localStorage.getItem('profile'))


    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const { payload } = await dispatch(commentPost({ value: finalComment, id: post._id }))
        setComments(payload.comments)
        setComment('')
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsOuterContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {
                        comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant='subtitle1'>
                                <strong>{c?.split(': ')[0]}</strong> {c?.split(': ')[1]}
                            </Typography>
                        ))
                    }
                </div>
                {user &&
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField
                            fullWidth
                            minRows='4'
                            variant="outlined"
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></TextField>
                        <br />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                }

            </div>
        </div>
    )
}

export default CommentSection
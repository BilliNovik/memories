import React from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles'
import { createPost, updatePost } from '../../redux/postSlice';

function Form({ setCurrentId, currentId }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [postData, setPostData] = React.useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })

    React.useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost({ currentId, postData: { ...postData, name: user?.result?.name } }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear()
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align='center'>
                    Please sign in to create your own memories
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating a Memory'}</Typography>
                <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label="Message" fullWidth value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label="Tags (coma separated)" fullWidth value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large"
                    type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small"
                    onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
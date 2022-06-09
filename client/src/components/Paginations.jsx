import React from 'react'
import { Pagination as Pagin, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { getPosts } from '../redux/postSlice'

function Paginations({ page }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { numberOfPages } = useSelector(state => state.posts)

    React.useEffect(() => {
        if (page) dispatch(getPosts(page))
    }, [page])

    return (
        <Pagin
            classes={{ ul: classes.ul }}
            count={5}
            page={1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    )
}

export default Paginations
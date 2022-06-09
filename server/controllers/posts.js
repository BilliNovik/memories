import mongoose from "mongoose";
import postMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    const { page } = req.query

    try {
        const LIMIT = 8;
        const startIndex = (+page - 1) * LIMIT
        const total = await postMessage.countDocuments({})

        const posts = await postMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({
            data: posts,
            currentPage: +page,
            numberOfPages: Math.ceil(total / LIMIT),
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        const title = new RegExp(searchQuery, 'i')

        const posts = await postMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
        res.json({ data: posts })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPostsById = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const post = await postMessage.findById(id)
        res.status(200).json(post)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    console.log(post)
    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatePost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    await postMessage.findByIdAndRemove(_id)

    res.json({ message: 'Post deleted succesfuly' })
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: 'unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const post = await postMessage.findById(_id)

    const index = post.likes.findIndex(id => id === String(req.userId))

    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true })

    res.json(updatedPost)
}

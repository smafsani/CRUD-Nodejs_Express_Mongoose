const express = require('express');
const router = express.Router();
const Post = require("../schema/postSchema");

// Get Post
router.get("/", async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({posts : posts});
    }catch(error){
        res.status(500).json({error : error.message});
    }
});
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const post = await Post.findById({_id : id});
        res.status(200).json({post : post});
    }catch(error){
        res.status(500).json({error : error.message});
    }
});

// Create Post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        await newPost.save();
        res.status(200).json({message : "Post Created Successfully."});
    }catch(error){
        res.status(500).json({error : error.message});
    }
});
router.post("/all", async (req, res) => {
    try {
        await Post.insertMany(req.body)
        .then((post) => { res.status(200).json({message: "Posts Created Successfully."}) })
        .catch((err) => { res.status(500).json({error: err.message}) });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Update Post
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const post = req.body.post;

    try{
        await Post.updateOne(
            {_id : id},
            {
                $set : {
                    title : title,
                    post : post
                }
            }
        );
        res.status(200).json({message : "Post Updated Successfully."});
    }catch(error){
        res.status(500).json({message : error.message});
    }
});

// Delete Post
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        await Post.deleteOne({_id : id});
        res.status(200).json({message : "Post Removed Successfully."});
    }catch(error){
        res.status(500).json({message : error.message});
    }
});

module.exports = router;
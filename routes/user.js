const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");

// Get User
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({users : users});
    }
    catch(err){
        res.status(500).json({error : error.message});
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById({_id : id});
        res.status(200).json({user : user});
    }
    catch(err){
        res.status(500).json({error : error.message});
    }
});

// Create User
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(200).json({user : newUser});   
    } catch (err) {
        res.status(500).json({error : err.message}); 
    }
});
router.post('/all', async (req, res) => {
    try {
        await User.insertMany(req.body)
        .then((user) => { res.status(200).json({message: "Users Created Successfully."})})
        .catch((err) => {res.status(500).json({message: err.message})});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

// Update User
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    try{
        await User.updateOne(
            {_id : id}, 
            {
                $set : {
                    name : name,
                    email : email,
                    mobile : mobile
                }
            }
        )
        res.status(200).json({message : "User Updated Successfully."});
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
    
});

// Delete User
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await User.deleteOne({_id : id});
        res.status(200).json({message : "User Removed Successfully."});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});


module.exports = router;
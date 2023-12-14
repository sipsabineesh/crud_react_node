import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js'
import User from "../models/userModel.js";


// @desc  Auth admin/set token
// route POST /api/admin/auth
// @ access Public
const authAdmin = asyncHandler(async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email:'admin@gmail.com'})
  if(user && (await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(201).json({
        _id : user._id,
        name : user.name,
        email : user.email,
    });
}
else {
    res.status(401);
    throw new Error('Invalid email or password');
}
});

// @desc create a new user
// route POST /api/users/createUser
// @ access Public
const createUsers = asyncHandler(async (req,res) => {
    const {name,email} = req.body
    const emailExists = await User.findOne({email})
    if(emailExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
            });
    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}); 

// @desc Logout admin
// route POST /api/admin/logout
// @ access Public
const logoutAdmin = asyncHandler(async (req,res) => {
   res.cookie('jwt','',{
    httpOnly:true,
    expires: new Date(0)
   })
   
    res.status(200).json({message:'Admin logged out'});
});


// // @desc Get user profile
// // route GET /api/users/profile
// // @ access Private
const getUsers = asyncHandler(async (req,res) => {
    try {
        const users = await User.find({isDeleted : false});
    
        if (users.length > 0) {
            const formattedUsers = users.map(user => ({
                _id: user._id,
                name: user.name,
                email: user.email,
            }));
            res.status(200).json(formattedUsers);
        } else {
            res.status(404);
            throw new Error("No users found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// // @desc Update user 
// // route POST /api/admin/updateUsers
// // @ access Private
const updateUsers = asyncHandler(async (req,res) => {
    const user = await User.findById(req.body._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password || user.password;
        }
        const updatedUser =await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
});

// // @desc Delete user 
// // route PUT /api/admin/deleteUsers
// // @ access Private
const deleteUsers = asyncHandler(async (req,res) => {
    const user = await User.findById(req.body._id);
    if(user){
        user.isDeleted = true;
       
        const deletedUser =await user.save();
        res.status(200).json({
            _id: deletedUser._id,
            name: deletedUser.name,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
});

export { 
    authAdmin,
    logoutAdmin,
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers
};
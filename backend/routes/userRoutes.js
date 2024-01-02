import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    authAdmin,
    logoutAdmin,
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers
 } from '../controllers/userController.js'
console.log("IN ROUTE")
router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.post('/adminLogin',authAdmin);
router.post('/adminLogout',logoutAdmin);
router.post('/createUsers',createUsers);
router.get('/getUsers',getUsers);
router.put('/updateUsers',updateUsers);
router.put('/deleteUsers',deleteUsers);


export default router;
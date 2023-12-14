import express from 'express';
const adminRouter = express.Router();
import { protect } from '../middleware/authMiddleware.js'
import {
    authAdmin,
    logoutAdmin,
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers 
 } from '../controllers/adminController.js'
// adminRouter.post('/',registerUser);
adminRouter.post('/auth',authAdmin);
adminRouter.post('/logout',logoutAdmin);
adminRouter.post('/createUsers',createUsers);
adminRouter.get('/getUsers',getUsers);
adminRouter.put('/updateUsers',updateUsers);
adminRouter.put('/deleteUsers',deleteUsers);

export default adminRouter;
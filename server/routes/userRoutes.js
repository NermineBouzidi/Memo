import express from 'express';
import { getAllUsers ,getUserById ,deleteUser, updateUser, createUser,getUserStats } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const userRouter = express.Router();

userRouter.post('/create-user', userAuth, requireAdmin, createUser);
// Change POST to PATCH for update route
userRouter.patch('/update-user/:id', userAuth, requireAdmin, updateUser);
userRouter.get('/get-all-users',userAuth,requireAdmin, getAllUsers);
userRouter.get('/get-user-by-id/:id', getUserById);
userRouter.delete('/delete-user/:id', deleteUser);  
userRouter.get('/stats', userAuth, requireAdmin, getUserStats);




export default userRouter;
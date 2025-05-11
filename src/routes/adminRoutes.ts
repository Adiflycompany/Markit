import express from 'express';
import protect from '../middleware/authMiddleware';
import isAdmin from '../middleware/isAdminMiddleware';
import {
  getAllPresences,
  deleteUser,
   getAllUsers,
} from '../controllers/adminController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/presences', protect, isAdmin, asyncHandler(getAllPresences));
router.get('/users', protect, isAdmin, asyncHandler(getAllUsers));
router.delete('/user/:id', protect, isAdmin, asyncHandler(deleteUser));


export default router;

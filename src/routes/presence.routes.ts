import express from 'express';
import {
  createPresence,
  getAllPresences,
  getUserPresences,
  deletePresence,
  exportPresencesToCSV,
} from '../controllers/presenceController';
import protect from '../middleware/authMiddleware';
;

const router = express.Router();

router.post('/scan', protect, createPresence);
router.get('/', protect, getAllPresences);
router.get('/user/:userId', protect, getUserPresences);
router.delete('/:id', protect, deletePresence);
router.get('/export', protect, exportPresencesToCSV);

export default router;

import express from 'express';
import { getItems, getItemById, seedItems } from '../controllers/items';
import { isAdmin, isLoggedIn } from '../middleware/isLoggedIn';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/seed', isLoggedIn, isAdmin, seedItems);

export default router;


import express from 'express';
import { createDiscount, getDiscount } from '../controllers/discount';
import { isAdmin, isLoggedIn } from '../middleware/isLoggedIn';
import validate from '../middleware/validate';
import { createDiscountValidator } from '../validators/dicount';
const router = express.Router();

router.post('/',isAdmin, validate(createDiscountValidator), createDiscount);
router.get('/',isLoggedIn, getDiscount);

export default router;
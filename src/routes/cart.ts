import express from 'express';
import { addItemToCart, getCart, updateItemQuantity } from '../controllers/cart';
import { isAdmin, isLoggedIn } from '../middleware/isLoggedIn';
import { addItemToCartValidator, updateItemQuantityValidator } from '../validators/cart';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/', isLoggedIn, getCart);
router.post('/:id', isLoggedIn, validate(addItemToCartValidator), addItemToCart);
router.put('/:id', isLoggedIn, validate(updateItemQuantityValidator), updateItemQuantity);

export default router;
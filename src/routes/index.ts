import express from 'express';
import user from './user';
import item from './item';
import cart from './cart';
import discount from './discount';
import order from './order';
const router = express.Router();

router.use('/user', user);
router.use('/items', item);
router.use('/cart', cart);
router.use('/discount', discount)
router.use('/order', order)

export default router;

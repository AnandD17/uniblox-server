import express from 'express';
import user from './user';
import item from './item';
import cart from './cart';
const router = express.Router();

router.use('/user', user);
router.use('/items', item);
router.use('/cart', cart);

export default router;

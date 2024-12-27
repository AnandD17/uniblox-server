import express from 'express';
import user from './user';
import item from './item';
const router = express.Router();

router.use('/user', user);
router.use('/items', item);

export default router;

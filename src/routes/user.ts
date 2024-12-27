import express from 'express';
import { createUserValidator, loginUserValidator, updateMeValidator } from '../validators/user';
import validate from '../middleware/validate';
import { createUser, updateMe, loginUser, getMe } from '../controllers/user';
import { isLoggedIn } from '../middleware/isLoggedIn';

const router = express.Router();

router.post('/', validate(createUserValidator), createUser);
router.put('/', isLoggedIn, validate(updateMeValidator), updateMe);
router.post('/login', validate(loginUserValidator), loginUser);
router.get('/me', isLoggedIn, getMe);

export default router;

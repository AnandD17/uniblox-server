import express from "express"
import { createOrder, getOrders } from "../controllers/order";
import { isLoggedIn } from "../middleware/isLoggedIn";

const router = express.Router();

router.post('/',isLoggedIn, createOrder);
router.get('/',isLoggedIn, getOrders);
export default router;

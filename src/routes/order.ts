import express from "express"
import { createOrder, getOrders, getOrderSummary } from "../controllers/order";
import { isAdmin, isLoggedIn } from "../middleware/isLoggedIn";

const router = express.Router();

router.post('/',isLoggedIn, createOrder);
router.get('/',isLoggedIn, getOrders);
router.get('/summary',isAdmin, getOrderSummary);
export default router;

import express from 'express';
import {setBudget,updateBudget,deleteBudget,getBudget} from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router =  express.Router();

router.get('/:userId/:month/:year',protect,getBudget);
router.post('/set',protect,setBudget);
router.put('/update/:id',protect,updateBudget);
router.delete('/:id',protect,deleteBudget);

export default router;
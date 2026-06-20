import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {getBudgetInsights }from '../controllers/budgetInsightsController.js';

const router = express.Router();

router.get('/',protect,getBudgetInsights);

export default router;
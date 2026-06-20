import express from "express";
import { addTransaction, getTransactions, updateTransaction, deleteTransaction, uploadReceipt, pausedRecurringTxn, resumeRecurringTxn, cancelRecurringTxn } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

router.patch("/:id/recurring/pause", protect, pausedRecurringTxn);
router.patch("/:id/recurring/resume", protect, resumeRecurringTxn);
router.patch("/:id/recurring/cancel", protect, cancelRecurringTxn);

router.post("/upload-receipt", upload.single("receipt"), protect, uploadReceipt);

export default router;
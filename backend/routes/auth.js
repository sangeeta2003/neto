import express from 'express';
const router = express.Router();

import {signup,login,logout} from "../controller/auth.js"



router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// VlJFBC3ZEaNlrEsG
// sangeeta2024


export default router;
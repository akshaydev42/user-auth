import express from 'express'
import {signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth} from '../Controller/controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/check-auth', verifyToken, checkAuth)

router.post('/signup', signup)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/logout', logout)

export default router
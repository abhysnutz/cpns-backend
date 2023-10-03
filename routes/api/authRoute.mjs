import express from 'express'
import { ForgotPassword, GetResetPassword, Login, MailVerify, ResendToken, SetResetPassword, Verify } from '../../controllers/api/authController.mjs'

const router = express.Router()

router.post('/api/auth/login', Login)
router.post('/api/auth/verify', Verify)
router.post('/api/auth/mail-verify', MailVerify)
router.post('/api/auth/resend-token', ResendToken)
router.post('/api/auth/forgot-password', ForgotPassword)
router.get('/api/auth/reset-password', GetResetPassword)
router.post('/api/auth/reset-password', SetResetPassword)
export default router;
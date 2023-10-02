import express from 'express'
import { Login, MailVerify, ResendToken, Verify } from '../../controllers/api/authController.mjs'

const router = express.Router()

router.post('/api/auth/login', Login)
router.post('/api/auth/verify', Verify)
router.post('/api/auth/mail-verify', MailVerify)
router.post('/api/auth/resend-token', ResendToken)
export default router;
import express from 'express'
import { Login, Verify } from '../../controllers/api/authController.mjs'

const router = express.Router()

router.post('/api/auth/login', Login)
router.post('/api/auth/verify', Verify)

export default router;
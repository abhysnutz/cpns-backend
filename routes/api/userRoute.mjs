import express from 'express'
import { create, validate } from '../../controllers/api/userController.mjs'

const router = express.Router()

router.post('/api/user',create)
router.post('/api/user/validate',validate)

export default router;
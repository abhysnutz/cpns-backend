import express from 'express'
import { create } from '../../controllers/api/userController.mjs'

const router = express.Router()

router.post('/api/user',create)

export default router;
import express from 'express'
import { city, create, province, show, update } from '../../controllers/api/userController.mjs'
import verifyToken from '../../middleware/verifyToken.mjs'

const router = express.Router()

router.post('/api/user',create)
router.get('/api/user/:id', verifyToken, show)
router.patch('/api/user/:id', verifyToken, update)
router.get('/api/province', verifyToken, province)
router.get('/api/city', verifyToken, city)

export default router;
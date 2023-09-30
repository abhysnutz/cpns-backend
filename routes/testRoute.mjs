import express from 'express'
import { Mail } from '../controllers/testController.mjs'

const TestRouter = express.Router()

TestRouter.get('/test/mail',Mail)

export default TestRouter
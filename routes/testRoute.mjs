import express from 'express'
import { GetCity, GetProvince, Mail } from '../controllers/testController.mjs'

const TestRouter = express.Router()

TestRouter.get('/test/mail',Mail)
TestRouter.get('/test/province',GetProvince)
TestRouter.get('/test/city',GetCity)

export default TestRouter
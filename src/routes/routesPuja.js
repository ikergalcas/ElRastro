import express from 'express'
import { getAllPujas } from '../controllers/PujaController.js'

const routerPuja = express.Router()

routerPuja.get('/', getAllPujas)

export default routerPuja
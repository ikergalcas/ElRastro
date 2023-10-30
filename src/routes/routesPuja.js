import express from 'express'
import { getAllPujas, createPuja, editPuja, deletePuja } from '../controllers/PujaController.js'

const routerPuja = express.Router()

routerPuja.get('/', getAllPujas)
routerPuja.post('/', createPuja)
routerPuja.put('/:id', editPuja)
routerPuja.delete('/:id', deletePuja)

export default routerPuja
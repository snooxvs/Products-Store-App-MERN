import express from 'express'
import { postProduct, deleteProduct, getAllProduct, putProduct } from '../controllers/productController.js'

const router = express.Router()

router.post('/',postProduct)
router.delete('/:id',deleteProduct)
router.get('/',getAllProduct)
router.put('/:id',putProduct)

export default router;

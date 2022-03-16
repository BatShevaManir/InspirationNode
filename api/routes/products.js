const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controller/products')

router.get('/', getAllProducts)
router.post('/', upload.single('image'), createProduct)
router.get('/:productId', getProduct)
router.patch('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router
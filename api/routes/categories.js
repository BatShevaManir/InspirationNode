const express = require('express')
const router = express.Router()

const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controller/categories')

router.get('/', getAllCategories);
router.post('/', createCategory)
router.patch('/:categoryId', updateCategory)
router.delete('/:categoryId', deleteCategory)

module.exports = router
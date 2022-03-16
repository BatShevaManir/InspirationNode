const Category = require('../models/category')
// const Product = require('../models/product')
const mongoose = require('mongoose')

module.exports = {
    getAllCategories: (req, res) => {
        Category.find().then((categories) => {
            res.status(200).json({
                categories
            })
        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])

    },
    createCategory: (req, res) => {
        const { name } = req.body
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name
        });

        category.save().then(() => {
            res.status(200).json({
                message: 'new category'
            })
        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    updateCategory: (req, res) => {
        const categoryId = req.params.categoryId
        Category.update({ _id: categoryId }, req.body).then(() => {
            res.status(200).json({
                message: "Category UPDATE"
            })

        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    deleteCategory: (req, res) => {
        const categoryId = req.params.categoryId
        Category.remove({ _id: categoryId }).then(() => {
            res.status(200).json({
                message: "Category remove"
            })

        }).catch((error) => [
            res.status(500).json({
                error: 'jnhynujmk'
            })
        ])
    }
}
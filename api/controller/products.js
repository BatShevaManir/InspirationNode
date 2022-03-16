const Product = require('../models/product')
const Company = require('../models/company')

const mongoose = require('mongoose');
module.exports = {
    getAllProducts: (req, res) => {
        Product.find().populate('companyId', 'name').populate('categoryId', 'name').then((products) => {
            res.status(200).json({
                products
            })
        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    getProduct: (req, res) => {
        const productId = req.params.productId
        Product.findById(productId).then((product) => {
            res.status(200).json({
                product
            })
        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    createProduct: (req, res) => {
        console.log('createProduct');
        // companyId
        const { description, companyId, colors, categoryId } = req.body
        const { path: image } = req.file;

        Company.findById(companyId).then((company) => {
            if (!company) {
                console.log('not found Company');
                res.status(404).json({
                    message: 'not found Company'
                })
            }
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                description,
                companyId,
                categoryId,
                colors,
                image: image.replace('\\', '/')
            })
            return product.save()
        }).then(() => {
            res.status(200).json({
                message: 'new product'
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })

    },
    updateProduct: (req, res) => {
        const productId = req.params.productId;
        const { companyId } = req.body

        // if (companyId) {
        console.log('0');
        Company.findById(companyId).then((company) => {
            console.log('1');
            if (!company) {
                console.log('2');

                res.status(404).json({
                    message: 'not found Company'
                })
            }
            return Product.update({ _id: productId }, req.body)

        })

            .then(() => {
                res.status(200).json({
                    message: "update product"
                })

            }).catch((error) => {
                res.status(500).json({
                    error
                })
            })
        // }
    },

    deleteProduct: (req, res) => {
        const productId = req.params.productId
        Product.remove({ _id: productId }, req.body).then(() => {
            res.status(200).json({
                message: "remove"
            })

        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    }
}

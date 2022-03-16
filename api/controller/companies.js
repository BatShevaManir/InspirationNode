const Company = require('../models/company')
const Product = require('../models/product')
const mongoose = require('mongoose')

module.exports = {
    getAllCompanies: (req, res) => {
        Company.find().then((companies) => {
            res.status(200).json({
                companies
            })
        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])

    },
    getCompany: (req, res) => {
        const companyId = req.params.companyId
        let products = []
        Company.findById(companyId).then((company) => {
            return new Promise(async (resolve, reject) => {
                try {
                    // let project = await Project.findById(projectId)
                    products = await Product.find(company.companyId)
                    console.log("--products--");
                    console.log(products);
                    res.status(200).json({
                        company,
                        products
                    })
                    resolve(company)

                }
                catch (err) {
                    console.log(err);
                    reject(err.message)

                }
            })

        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    createCompany: (req, res) => {
        const { name, description } = req.body
        const company = new Company({
            _id: new mongoose.Types.ObjectId(),
            name,
            description
        });

        company.save().then(() => {
            res.status(200).json({
                message: 'new compny'
            })
        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    updateCompany: (req, res) => {
        const companyId = req.params.companyId
        Company.update({ _id: companyId }, req.body).then(() => {
            res.status(200).json({
                message: "company UPDATE"
            })

        }).catch((error) => [
            res.status(500).json({
                error
            })
        ])
    },
    deleteCompany: (req, res) => {
        const companyId = req.params.companyId
        Company.remove({ _id: companyId }).then(() => {
            res.status(200).json({
                message: "company remove"
            })

        }).catch((error) => [
            res.status(500).json({
                error: 'jnhynujmk'
            })
        ])
    }
}
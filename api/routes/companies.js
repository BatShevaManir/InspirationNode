const express = require('express')
const router = express.Router()

const {
    getAllCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
} = require('../controller/companies')

router.get('/', getAllCompanies);
router.get('/:companyId', getCompany);
router.post('/', createCompany)
router.patch('/:companyId', updateCompany)
router.delete('/:companyId', deleteCompany)

module.exports = router
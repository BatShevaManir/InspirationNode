const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    description: String,
    email: String,
    tel: String,

})

module.exports = mongoose.model('Company', companySchema)
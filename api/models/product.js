const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // name: { type: String, require: true },
    description: String,
    companyId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Company' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Category' },
    image: { type: String },
    price: String,
    colors: []
})

module.exports = mongoose.model('Product', productSchema)
const mongoose = require('mongoose')
const { model, Schema } = mongoose

const orderItemSchema = Schema({
    name: {
        type: String,
        minlength: [5, 'Panjang nama makanan minimal 5 karakter'],
        require: [true, 'Nama makanan harus diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga item harus diisi']
    },
    qty: {
        type: Number,
        required: [true, 'Jumlah barang harus diisi'],
        min: [1, 'Minimal 1 barang!']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
})

module.exports = model('OrderItem', orderItemSchema)
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : [String],
        required : true,
        default : []
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true,
        default : 0
    },
    

})

const Product = mongoose.model("products",productSchema)
export default Product;
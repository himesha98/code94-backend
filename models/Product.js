const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        SCU: {
            type: String,
            required: true

        },

        Quantity: {
            type: Number,
            required:true
        },
        ProductName: {
            type: String,
            required:true
        },
        Image: {
            type: Array,
            default: []
        },
        Desc: {
            type: String,
            default: ""
        },
        IsFavourite:{
            type:Boolean,
            default:false
        },
        Price:{
            type:Number,
            default:0
        }

    },


);

module.exports = mongoose.model("Product", ProductSchema);



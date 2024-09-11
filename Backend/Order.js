const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema(
    {
        email:
        {
            type:String,
            required:true
        },
        date:
        {
            type:Date,
            default:Date.now()
        },
        food_items:
        {
            type:Array,
        }
    }
)

module.exports=mongoose.model('Orders',orderSchema)

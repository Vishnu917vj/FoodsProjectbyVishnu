const express=require('express')
const router=express.Router();
router.get('/fetchdata',async (req,res)=>
{
   try
   {
    res.send([global.food_items,global.food_categories]);
   }
   catch(err)
   {
    console.log(err);
   }
})

module.exports=router
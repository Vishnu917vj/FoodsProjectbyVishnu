const express=require('express')
const user=require('../User')
const {body,validationResult}=require('express-validator')
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const something= "MYNAMEISVISHNU";
router.post('/createuser',[
    body('name').isLength({min:5}),
    body('location').isLength({min:5}),
    body('password').isLength({min:5}),
    body('email').isEmail()
],async (req,res)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
   try{
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    await user.create(
        {
            name:req.body.name,
            location:req.body.location,
            password:secPass,
            email:req.body.email
        }
    );
    res.json({succes:true});
   }
   catch(err)
   {
    console.log(err);
    res.json({succes:false});
   }
    
})
// router.post('/verifyuser',async (req,res)=>
// {
//     const token=req.body.token;
//     if(!token)
//     {
//         console.log("No token found");
//        return res.json({succes:false});
//     }
//     jwt.verify(token,something,(err,decoded)=>
//     {
//         if(err)
//         {
//             console.log(err);
//             return res.json({succes:false});
//         }
//         else
//         {
//             console.log(decoded);
//             return res.json({succes:true,decoded:decoded});
//         }
//     })
// })
router.post('/loginuser',async (req,res)=>
{
   try
   {
    const user1=await user.findOne({email:req.body.email});
    const compare=await bcrypt.compare(req.body.password,user1.password);
    if(!user1)
    {
        return res.json({succes:false});
    }
    if(!compare)
    {
        return res.json({succes:false});
    }
    const data={
        user:user1._id
    }
    const token=jwt.sign(data,something);
    console.log(token);
    res.cookie('jwt', token, {
        httpOnly: true,  // Prevent access from JavaScript
        secure: true,    // Only send over HTTPS
         // Prevent CSRF
    });  
    res.json({succes:true});
   }
   catch(err)
   {
    console.log(err);
    res.json({succes:false});
   }
})

module.exports=router;
const express=require('express');
const cors = require('cors');
const mongodb=require('./db.js');
const cookieParser = require('cookie-parser');
const port=process.env.PORT|| 5000;
var app=express();
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(cookieParser());  
app.use(express.json());
app.use('/api',require('./Routes/createuser.js'));
app.use('/api',require('./Routes/fetchData.js'));
app.use('/api',require('./Routes/orderData.js'));
app.listen(port,
    function(){
        mongodb();
        console.log("listening at 3000");
    }
);
app.get('/',(req,res)=>
{
    res.send("Hello gays");
})

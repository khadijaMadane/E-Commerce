const Users = require('../models/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const userCtrl={
 register: async (req,res) => {
     try {
         const {name, email, password}= req.body;

         const user = await Users.findOne({email});
         if(user) 
            return res.status(400).json({msg:"this email already"})
         
         if(password.length < 6) 
         return res.status(400).json({msg:'password should be atleast 6 characters longs'})
 
         const passwordHash = await bcrypt.hash(password, 10)
         const newUser = new Users({ 
            name, email, password:passwordHash 
        });
         await newUser.save();
         const accesstoken = createAccessToken({id: newUser._id})
         const refreshtoken = createRefreshToken({id: newUser._id})
         res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            path:'/user/refresh_token'
         })
        // res.json(accesstoken)
         return res.json({msg: 'register success' })
     } catch (err) {
        return res.status(500).json({msg: err.message})
        
     }
 },
 login: async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg: 'user doe not exist'})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg:'incorrect password'})
        return res.json({msg:"login success"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
 },
refreshToken: async (req,res)=>{
    try {
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg:'Please login or Register'})
        jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
            if(err) return res.status(400).json({msg:"login or register now"})
            const accesstoken = createAccessToken({id:user.id})
            return res.json({accesstoken})
        })
       
    } catch (err) {
        return res.status(500).json({msg: err.message}) 
    }
    
}


}
const createAccessToken = (user)=> {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken= (user)=> {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl
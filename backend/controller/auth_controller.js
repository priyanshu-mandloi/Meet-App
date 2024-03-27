const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const{hashPassword,comparePassword} = require('../helpers/auth_help');
const test = (req,res)=>{
  res.json("test is Working");
}

const registerUser =async(req,res)=>{
   try{
      const {name,email,password} = req.body;
      // check if the name is not given
      if(!name){
         return res.json({
             error:'name is required' 
         })
      };
      // check for the password
      if(!password||password.length<6){
        return res.json({
            error:'Password is required and must be at Least 6 characters Long' 
        })
     };
     // check Email
      const exist = await User.findOne({email});
      if(exist){
        return res.json({
           error:"Email already exists"
        });
      }

      const hashedPassword = await hashPassword(password); 
      const user = await User.create({
        name,
        email,
        password:hashedPassword
      });
      return res.json(user);
   }catch(err){
      console.log(err);
   }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }
        // Check if the password matches
        const match = await comparePassword(password, user.password);
        if(match){
            jwt.sign({email:user.email,id:user._id,name:user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            //  console.log("JAI HO ==> ",token);
             if (err) {
                 console.error('JWT sign error:', err);
                 return res.status(500).json({ error: 'Internal server error' });
             } else {
                //  console.log('Generated JWT token:', token);
                 // Set the token as a cookie
                 res.cookie('token', token);
                 // Respond with user data
                 res.json({
                    message: 'Login successful',
                    user: user
                 });
             }
         }); 
         
        } else {
            return res.json({
                error: 'Incorrect password'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
 }
 

const getProfile = (req, res) => {
    const { token } = req.cookies;
    console.log("Profile ==> ",token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {},(err, decoded) => {
            if (err) {
                console.error("ERROR ===> ",err);
                return res.status(401).json({ error: 'Invalid token' });
            }
            // If the token is valid, you can access the decoded payload
            // console.log(decoded);
            res.json(decoded);
        });
    } else {
        res.status(401).json({ error: 'Token not provided' });
    }
}


module.exports = {test,registerUser,loginUser,getProfile};


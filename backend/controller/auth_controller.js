const User = require('../models/user');
// const jwt = require('jsonwebtoken');
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
       if (!match) {
           return res.json({
               error: 'Incorrect password'
           });
       }

       // If the password matches, return a success response
       res.json({
           message: 'Login successful',
           user: user // Optionally, you can send user data in the response
       });
   } catch (err) {
       console.error(err);
       res.status(500).json({
           error: 'Internal server error'
       });
   }
}

// const getProfile = (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//                 console.error("JWT verification error:", err);
//                 return res.status(401).json({ error: "Unauthorized" });
//             }
//             res.json(user);
//         });
//     } else {
//         res.json(null);
//     }
// }

module.exports = {test,registerUser,loginUser};
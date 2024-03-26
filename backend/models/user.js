// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true
//   },
//   user_email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   user_password: {
//     type: String,
//     required: true
//   },
//   user_full_name: {
//     type: String,
//     required: true
//   },
//   user_avatar: {
//     type: String
//   }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;



const mongoose = require('mongoose');
const {schema} = mongoose;
const userSchema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique:true
  },
  password:String
})

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;
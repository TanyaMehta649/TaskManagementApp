// const bcrypt=require('bcryptjs');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken'); 
// const Signup = async (req, res) => {
//   try {
//     const {name,email,password,confirmpassword}=req.body;
//     const existingUser=await user.findOne({email});
//     if(existingUser) return res.status(400).json({error:"user already exists"});
//     if(password!==confirmpassword){
//       return res.status(400).json({error:"passwords does not match"})
//     }
//     const hashedPassword=await bcrypt.hash(password,10);
//     const user = await User.create({
//       name,
//       email,
//       password:hashedPassword,
//       confirmpassword:hashedPassword
//     });
//     res.status(201).json({message:"user registered",user});
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// const Login=async(req,res)=>{
//   try{
//     const{email,password}=req.body;

//     const user=await User.findOne({email});
//     //agar mail id mili toh thik h nahi toh user not found 
//     if(!user) return res.status(400).json({error:"user not found"});
//     const isMatch=await bcrypt.compare(password,user.password);
//     if(!isMatch) return res.status(400).json({error:"invalid credentials"});
//     const token=jwt.sign({userId:user._id}.process.env.JWT_SECRET,{
//       expiresIn:'1h'
//     })
//     res.status(200).json({message:"login succesfully",user});

//   }
//   catch(err){
//     res.status(500).json({error:err.message});
//   }
// }
// module.exports = { Signup,Login };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const existingUser = await User.findOne({ email }); 
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); 
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { Signup, Login };

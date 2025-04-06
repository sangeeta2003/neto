
import {User} from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndCookies } from '../utils/generateToken.js';

export async function signup(req,res){
    try{
const{email,password,username} = req.body;
if(!email || !password || !username){
return res.status(400).json({success:false,message:"All fileds are required"})
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
    return res.status(400).json({success:false,message:"Invalid email"})
}
if(password.length < 6){
    return res.status(400).json({success:false,message:"Password must be 8 charcters"})
}
const existingUserByEmail = await User.findOne({email:email})

if(existingUserByEmail){
    return res.status(400).json({success:false,message:"Email already exsits"})
}

const existingusername = await User.findOne({username:username})

if(existingusername){
    return res.status(400).json({success:false,message:"Username already exsits"})
}

const salt = await bcryptjs.genSalt(10);
const hasedPassword = await bcryptjs.hash(password,salt);

const profilePics = ['/avatar1.png','/avatar2.png','/avatar3.png'];
const image = profilePics[Math.floor(Math.random() * profilePics.length)];





const newUser = new User({
    email,
    password : hasedPassword,
    username,
    
     image
})

await newUser.save();
generateTokenAndCookies(newUser._id, res);
        
        res.status(201).json({
            success:true,
            user:{
                ...newUser._doc,
                password:"",
            },
        })
    

    }catch(error){
        console.log('error in signup',error.message);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
    
}

export async function login(req,res){
try{
const{email,password} = req.body;
console.log("Request body:", req.body);

if(!email || !password){
    return  res.status(400).json({success:false,message:"All fileds are required"});
 }
 
const user = await User.findOne({email : email})
if(!user){
    return res.status(404).json({success:false,message:"Invalid email or password"})
}

const isPasswordCorrect = await bcryptjs.compare(password,user.password);
if(!isPasswordCorrect){
    return res.status(400).json({success:false,message:"Invalid credentials"});
}
generateTokenAndCookies(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: "",
            },
        });
}catch(error){
    console.log('error in login',error.message);
    return res.status(500).json({success:false,message:"Internal server error"})
}

}

export async function logout(req,res){
    try{
res.clearCookie('jwt-netflix');
res.status(200).json({success:true,message:"Logged out successfully"});
    }catch(error){
console.log("error in logout controller",error.message);
res.status(500).json({success:false,message:"internal server error"});
    }
}
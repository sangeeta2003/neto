import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

// login
export const Login = async(req,res) =>{

    try{
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Invalid data",
                success:false
            })
        };
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message:"Invalid email and password",
                success:false
            })
        };
        const isMtach = await bcryptjs.compare(password,user.password);
        if(!isMtach){
            return res.status(401).json({
                message:"Invalid email and password",
                success:false
            })
        };
        const token = jwt.sign({ id: user._id }, "ghhuuughghb", { expiresIn: "1d" });

        return res
            .status(200)
            .cookie("token", token, { httpOnly: true })
            .json({
                message: `Welcome back ${user.fullName}`,
                success: true
            });

    }catch(error){
        console.log(error)
    }

}


// Logout

export const Logout = async(req,res) =>{
   return res.status(200).cookie('token',"",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
    message:"User logged out successfully",
    success:true
   })
}


// Register
export const Register = async(req,res) =>{
try{
    const {fullName,email,password} = req.body;
    if(!fullName || !email || !password)  {
        return res.status(401).json({
            message:"Invalid Data",
            success : false
        })
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(401).json({
            message : "This email is already used",
            success:false
        })
    }
    const hashedPassword = await bcryptjs.hash(password,16);
    // 16 is the salt value so 16 long password is created 
    await User.create({
        fullName,
        email,
        password:hashedPassword
    });
    return res.status(201).json({
        message :"Account created successfully",
        success:true
    })

}catch(error){
console.log(error);
}
}
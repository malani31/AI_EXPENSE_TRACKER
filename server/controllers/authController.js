import bcrypt from "bcryptjs";
import userModel from "../model/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser=async (req,res)=>{
    try {
        const {name,email,password,currency} =req.body;

        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        // console.log(hashedPassword);
        const user=await userModel.create({name,email,password:hashedPassword,currency});
        res.status(201).json({
            message:"user Registration successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                currency:user.currency
            },
            token:generateToken(user._id),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"somthing went wrong in register user"});
    }
}

export const loginUser = async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        const ismatched=await bcrypt.compare(password,user.password);
        if(!ismatched){
            return res.status(400).json({message:"invalid password"})
        }

        res.status(200).json({
            message:"Login successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                currency:user.currency
            },
            token:generateToken(user._id),
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"somthing went wrong in login user"})
    }
}
import bcryptjs from "bcryptjs";
import userModel from '../model/User.js';

export const getUserProfile=async (req,res)=>{
    try {
        const user= await userModel.findById(req.user.id).select("-passsword");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong in getting profile"})
    }
}

export const updateUserProfile=async (req,res)=>{
    try {
        const user=await userModel.fingById(req.user.id);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        user.name=req.body.name ||user.name;
        user.email=req.body.email || user.email;
        user.currency=req.body.currency || user.currency;

        if(req.body.password){
            const hashedPassword=await bcryptjs.hash(req.body.password,10);
            user.password=hashedPassword;
        }

        const updateUser=await user.save();

        res.status(200).json({
            message:"profile updated successfully",
            user:{
                _id:updateUser._id,
                name:updateUser.name,
                email:updateUser.email,
                currency:updateUser.currency,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong in updating profile"})
    }
}
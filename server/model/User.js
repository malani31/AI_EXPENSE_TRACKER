import mongoose from "mongoose";

const userSchema= mongoose.Schema(
    {
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    currency:{type:String,default:"INR",},
    picturePic:{type:String,default:""},
    },
    {timestamps:true}
)

const userModel=mongoose.model("User",userSchema);

export default userModel;
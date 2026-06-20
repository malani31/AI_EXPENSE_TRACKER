import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        message:{type:String,required:true},
        type:{ type:String,enum:["budget","income","spending","general"],default:"general"},
        aiGenerated:{type:Boolean,default:false},
        isRead:{type:Boolean,default:false},
        createAt:{type:Date,default:Date.now}
    }
)

const notificationModel=new mongoose.model("Notification",notificationSchema);

export default notificationModel;
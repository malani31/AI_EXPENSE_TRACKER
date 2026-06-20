import mongoose from "mongoose";

const notificationSettings=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        budgetAlets:{type:String,default:true},
        aiInsights:{
            enabled:{type:Boolean,default:false},
            frequency:{type:String,enum:["daily","weekly"],default:"daily"}
        },
        reminders:{type:Boolean,default:true},
    },{timestamps:true}
)
const notificationSettingsModel=new mongoose.model("NotificationSettings",notificationSettings)
export default notificationSettingsModel;
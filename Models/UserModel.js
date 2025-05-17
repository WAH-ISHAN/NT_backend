import mongoose from "mongoose";




const userSchema = new mongoose.Schema({

    Email:{
        Type:String,
        required:true,
        unique:true
    },
    FristName:{
        Type:String,
        required:true 
    },
    LastName:{
        Type:String,
        required:true
    },
    UserType:{
        Type:String,
        required:true
    },
    Password:{
        Type:String,
        required:true
    },
    PhoneNumber:{
        Type:String,
        required:true
    },
    isDisabled:{
        Type:Boolean,
        default:false
    },
    isEmailVerified:{
        Type:Boolean,
        default:false
    },
    isPhoneVerified:{
        Type:Boolean,
        default:false
    },
})

const User = mongoose.model("users",UserSchema);
export default User;
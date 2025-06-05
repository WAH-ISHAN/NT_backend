import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    usertype : {
        type : String,
        required : true,
        default : "user"
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        default : "Not given"
    },
    isDisabled : {
        type : Boolean,
        required : true,
        default : false
    },
    isEmailVerified : {
        type : Boolean,
        required : true,
        default : false
    },
    lastLoggedIn: {
  type: Date,
  default: null,
}

})
const User = mongoose.model("users",userSchema)
export default User;
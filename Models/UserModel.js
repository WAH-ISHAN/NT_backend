import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    FristName: {
        type: String,
        required: true 
    },
    LastName: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
});

const Userz = mongoose.model("User", userSchema);
export default Userz;

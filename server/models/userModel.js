import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
    verifyOtp: {type: String, default: ''},
    verifyOtopExpiresAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpiresAt: {type: Number, default: 0}
})
const userModel = mongoose.models.user || mongoose.model("users", userSchema);
export default userModel;
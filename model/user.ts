import mongoose, { Schema, models } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    password: {
        type: String,
        required: [true, "A password is must for authentication"]
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ],
    profileImage: { type: String },
},
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

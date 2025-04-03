import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    sessions: {
        type: Number,
        default: 0
    },
    posture_score: {
        type: Number,
        default: 0
    },
    desc: {
        type: String,
    }
}, {timestamps: true})

const Exercise = mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema)

export default Exercise;
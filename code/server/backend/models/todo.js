import mongoose     from "mongoose";


const todoSchema = new mongoose.Schema({
    text: String,

    completed: {
        type: Boolean,
        default: false
    },
    
    created: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model("Todo", todoSchema);
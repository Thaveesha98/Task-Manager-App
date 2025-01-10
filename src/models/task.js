const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim:true
    },
    
    description:{
        type: String,
        default: 0,
        required: true,
        trim:true
        
    },

    complete:{
        type: Boolean,
        default: false,
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true ,
        ref:'Users'
    }
},{
    timestamps: true,
})



const Task =  mongoose.model('Tasks',taskSchema) 

module.exports = Task
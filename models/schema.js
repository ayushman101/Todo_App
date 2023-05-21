const mongoose=require('mongoose');

// The objects inside Schema are actually for Validation purpose 
// This does not mean that the values in the object are object themselves. No they are not.

const TaskSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must give a name"],
        maxlength:[40,"Name should be at most 40 characters"],
        trim:true,
    }, 
    completed:{
        type:Boolean,
        default:false,
    },
    
    CreatedBy:{
        type:mongoose.Types.ObjectId,  // the type would be same as the objectid in mongoose
        ref:'User',
        required:[true,"Please Provide User"]
    }
});
                                
module.exports=mongoose.model('Task',TaskSchema);   // first arg is collection name and second arg is schema
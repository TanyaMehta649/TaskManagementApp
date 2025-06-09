const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        },
        description:String,
        status:{
            type:String,
            enum:['pending','in-progress','completed'],
            default:'pending'
        }

},{timestamps:true});
//this tells mongoose to automatically add createdat and updatedat fields
module.exports=mongoose.model('Task',taskSchema);
//models are used to define the structure and behaviour of data
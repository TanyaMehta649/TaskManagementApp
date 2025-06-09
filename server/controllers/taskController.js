//handles crud operations on task model
const Task=require('../models/Task')
exports.createTask=async(req,res)=>{
    try{
        const task=await Task.create(req.body);
        res.status(201).json(task);

    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}
//retrieves all tasks from database using Task.find()
exports.getTask=async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.json(tasks); 
     }
     catch(err){
        res.status(500).json({error:err.message});
     }
}
//updates the task based on id from url and 
exports.UpdateTask=async(req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        //new true matlb it will return the updated task
        res.json(task);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}
exports.deleteTask=async(req,res)=>{
try{
    const task=await Task.findByIdAndDelete(req.params.id);
    res.json({message:'task deleted'});

}
catch(err){
    res.status(400).json({error:err.message});
}

}

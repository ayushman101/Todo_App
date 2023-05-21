const Task=require('../models/schema');


//Get All Tasks
const getAlltasks= async (req,res)=>{
    
    console.log("get all tasks");
    const {id}=req.params;

    try {
        
        const task = await Task.find({CreatedBy:id});   //   {}  is called a filter object which is just an empty object 
                                            // the function 'find ' with filter object returns all the objects 
        // console.log(task);
        res.status(200).json(task);
        
    } catch (error) {

        res.status(500).json(error);   // 500=> General SERVER ERROR
        
    }
    res.end();
}




//Get a Single Task
const getsingletasks=async (req,res)=>{

try {
    
    const TaskId=req.params.id;         //Use Query string to get the ID

    const task=await Task.findOne({_id:TaskId});  // findOne()  funtion finds the object with the condition provided as arg

    if(!task)
    {

        return res.status(404).json({msg:`No object with id: ${TaskId}`});   // Error message in case task with given Id is not found
    }

    res.status(200).json({task});

} catch (error) {
    
    res.status(500).json(error);  // Another error message when ID value has INVALID SYNTAX , e.g. Wrong length, invalid character,etc.
}
    res.end();
}



// We use Try and catch because we are also validating the request body
//If the body has invalid format then we don't accept it.
//In that case our server must send an error to user and tell them what they did 
//wrong. Status 500 is general SERVER ERROR


//New Task
const createtasks= async (req, res)=> {
    
    console.log("create task");

    req.body.CreatedBy=req.body.UserID;

    try {
        const task = await Task.create(req.body);
        
        res.status(201).json(task);
        
    } catch (error) {
        
        res.status(500).json(error);   // 500=> General SERVER ERROR
        
    }
    
    res.end();
}



//Delete Task
const deletetasks= async (req,res)=>{
    
    try {
        // const userID= req.body.CreatedBy;
        const taskId=req.params.id;
        
        const task= await Task.findOneAndDelete({
            _id:taskId,
            CreatedBy:req.body.UserID
        });
        
        if(!task)
        {
            return res.status(404).json({msg:`No Item with ID: ${taskId}`});
        }
        
        res.status(200).json(task);
        
    } catch (error) {
        
        res.status(500).json(error);
        
    }
    
    res.end();
}


//Update a task
const updateTask=async (req,res)=>{
    try {
        
        console.log("updating task")
        const taskId=req.params.id;

        const task= await Task.findOne({
            _id:taskId,
            CreatedBy: req.body.UserID
        });

        if(!task)
        {
            res.status(404).json({msg:`No item with ID: ${taskId}`});
        }

        else
        {

            task.completed= !task.completed;
    
            task.save();
    
            res.status(200).json(task);
        }

    } catch (error) {
        
        res.status(500).json(error);

    }
    res.end();
}

module.exports={
    getAlltasks,getsingletasks,updateTask,createtasks,deletetasks,
}

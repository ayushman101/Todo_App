const express=require('express');

const router=express.Router();

const {getAlltasks,getsingletasks,updateTask,createtasks,deletetasks}=require('../controllers/controls');

//Get all Tasks,  Post a new Task
router.route('/').get(getAlltasks).post(createtasks);

//Single Task,  Delete a Task,      Update a Task
router.route('/:id').get(getsingletasks).delete(deletetasks).patch(updateTask);


module.exports=router;
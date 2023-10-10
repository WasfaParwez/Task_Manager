const taskModel = require('../model/taskModel')

const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };


const CreateTask = async (req,res)=>{
    try{
    const data= req.body;
    const {email,task} = data;
    if(!email || !task){
        return res.status(400).json({status: false,message: "Please provide email and task both"})
    }
    if(!isValidEmail(email)){
        return res.status(400).json({status: false,message: "Please provide a valid email"})
    }

    const emailUsed = await taskModel.findOne({ email: email });
    if (emailUsed) {
        return res.status(400).json({status: false, message:"email already exists"})
    }

    const taskcreated = await taskModel.create(data);
    return res.status(201).json({status: true, message:taskcreated})
    }
 catch (error) {
    res.status(500).json({status: false,message: error.message,});
  }
}

const GetTask = async (req,res)=>{
    try{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({status: false,message: "Please provide email"})
    }
    const findTask = await taskModel.findOne({email:email});
    if(!findTask){
        return res.status(404).json({status: false,message: "Task not found"})
    }
    return res.status(200).json({status: true,message: findTask})
    }
    catch (error) {
    res.status(500).json({status: false,message: error.message,});
}
}

const UpdateTask = async (req, res) => {
    try {
    const {email,task}=req.body;
    if(!email||!task){
        return res.status(400).json({status: false,message: "Please provide task and email"})
    }
    const findTask = await taskModel.findOne({email:email});
    if(!findTask){
        return res.status(404).json({status: false,message: "Task not found"})
    }
    const updateTask = await taskModel.findOneAndUpdate({email:email},{$set:{task:task}},{new:true});
    return res.status(200).json({status: true,message: "Task updated successfully"})   
}
catch (error) {
    res.status(500).json({status: false,message: error.message,});
}

}

const DeleteTask = async (req, res) => {
    try {
    const {email}=req.body;
    const deleteTask = await taskModel.findOneAndDelete({email:email});
    if(!deleteTask){
        return res.status(404).json({status: false,message: "Task not found"})
    }
    return res.status(200).json({status: true,message: "Task deleted successfully"})
}
    catch (error) {
    res.status(500).json({status: false,message: error.message,});
    }
}




module.exports = {
    CreateTask,
    GetTask,
    UpdateTask,
    DeleteTask
    
}
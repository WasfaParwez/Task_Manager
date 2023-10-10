const express=require('express');
const route= express.Router();
const {CreateTask,
    GetTask,
    UpdateTask,
    DeleteTask}=require('../controller/controller');


route.post('/createTask', CreateTask);

route.get('/getTask', GetTask);

route.put('/UpdateTask', UpdateTask);

route.delete('/deleteTask', DeleteTask);





module.exports = route;
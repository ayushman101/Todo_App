
const express=require('express');
const connectDB=require('./db/connect');
const tasks=require('./routes/tasks')
const cors= require('cors');

require('dotenv').config();

const app= express(); 


//Serve the React Frontend build
app.use(express.static("./client"))

app.use(express.json());        // without this the incoming request will be undefined 
app.use(cors());

//tasks routes inside routes folder
app.use('/api/v1/tasks',tasks)

//Environment Variable for Deployment
const port =process.env.PORT || 3000;

const start= async()=>{
    try {

        //Connecting with Database,  Inside db folder
        await connectDB(process.env.MONGO_URI);

        
        app.listen(port,console.log(`Server is listening on port ${port}`));

    } catch (error) {
        console.log(error);
    }
}

//Start the server;
start()


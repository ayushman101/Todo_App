const mongoose=require('mongoose');

const connectDB= (url)=>{
    
    mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then(console.log("DB connected"))

};

module.exports = connectDB;

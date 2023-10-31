const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

module.exports = () =>{
    const connectionParams ={
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.MONGO_CONNECTION_URI, connectionParams);
        console.log('Connected to database successfully');
    }catch(e){
        console.log(e.message);
        console.log('Could not connect database!')
    }
}
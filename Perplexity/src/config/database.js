import mongoose from 'mongoose';

async function connectTODB(){
    mongoose.connect(process.env.MONGO_URI)
       .then(()=>{
        console.log("Server connected to DB");
       })
}


export default connectTODB;
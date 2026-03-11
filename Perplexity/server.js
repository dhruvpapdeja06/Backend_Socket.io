
import app from "./src/app.js";
import connectTODB from "./src/config/database.js";


connectTODB()
    .catch((err)=>{
        console.error("MongoDB connection failed:",err);
        process.exit(1);
    });




// Server is running on Port 3000
app.listen(3000,()=>{
    console.log("Server is running on Port: 3000");
})
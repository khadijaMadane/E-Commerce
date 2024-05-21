// const { default: mongoose } = require("mongoose")

// const dbConnect = () =>{
//     try {
//         const conn = mongoose.connect(process.env.MONGODB_URL);
//         console.log("Database Connected Successfully");
//     } catch (error) {
//         console.log("Database error");
        
//     }
// };
// module.exports = dbConnect;


const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Error: ", error);
        process.exit(1); // Stop the process if the database connection fails
    }
};

module.exports = dbConnect;

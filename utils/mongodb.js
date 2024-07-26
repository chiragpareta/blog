// import mongoose from 'mongoose';

// const MONGODB_URI = 'mongodb://localhost:27017/blog';

// async function connectToDatabase() {
//     if (mongoose.connections[0].readyState) {
//         console.log("connected successfully")
//         return { db: mongoose.connection.db };
//     }

//     await mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     return { db: mongoose.connection.db };
// }

// export default connectToDatabase;


import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected to MongoDB");
        return { db: mongoose.connection.db };
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Increase the timeout
        });
        
        console.log("Connected to MongoDB successfully");
        return { db: mongoose.connection.db };
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default connectToDatabase;
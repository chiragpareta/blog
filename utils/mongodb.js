import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/blog';

async function connectToDatabase() {
    if (mongoose.connections[0].readyState) {
        console.log("connected successfully")
        return { db: mongoose.connection.db };
    }

    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return { db: mongoose.connection.db };
}

export default connectToDatabase;



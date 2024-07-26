import connectToDatabase from "./utils/mongodb.js";

async function testConnection() {
    try {
        await connectToDatabase();
        console.log('Database connection established');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

testConnection();

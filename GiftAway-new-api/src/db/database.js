const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')


// Create a new MongoClient
//const client = new MongoClient(process.env.MONGO_DATABASE_URL);

async function connectToMongoDB() {
    try {
        // Connect to the MongoDB server
        const db = await mongoose.connect(process.env.MONGO_DATABASE_URL)

        console.log('Connected to MongoDB Atlas', db.connection.host )
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToMongoDB
const mongoose = require('mongoose');
const url = "mongodb+srv://iamvishnuamarapu:AGdgyIKGRYyEqZec@vjfoods.x4jbz.mongodb.net/vjFoods?retryWrites=true&w=majority&appName=vjFoods";

const mongodb = async () => {
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,       // Use the new URL string parser
            useUnifiedTopology: true     // Use the new Server Discover and Monitoring engine
        });
        console.log("Connected to MongoDB");

        // Access the specific collection "foodData"
        const collection = mongoose.connection.db.collection('foodData');
        const collection2=mongoose.connection.db.collection('foodCategories');
        // Fetch data from the "foodData" collection
        const fetched_data = await collection.find({}).toArray();
        const fetched_data2 = await collection2.find({}).toArray();
        global.food_items=fetched_data;
        global.food_categories=fetched_data2;

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongodb;

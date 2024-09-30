const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://rohitgoythale23:rohitgoythale23@foodblog.jrvcnai.mongodb.net/FoodMania?retryWrites=true&w=majority&appName=FoodBlog');
        console.log("Connected to database...!");
    } catch (error) {
        console.log('Fail to connect database...!', error.message);
    }
};

dbConnect();
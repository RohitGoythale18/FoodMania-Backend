require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const cors = require("cors");
const sweetRoutes = require("./routes/Sweets/Sweets");
const spiceRoutes = require("./routes/Spices/Spices");
const soupRoutes = require("./routes/Soups/Soups");
const nonvegRoutes = require("./routes/Nonveg/Nonveg");
const contactRoutes = require("./routes/contact/Contact");
const globalErrHandler = require("./middlewares/globalErrHandler");
const bodyParser = require("body-parser");
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/foodmania/recipe', sweetRoutes);
app.use('/foodmania/recipe', spiceRoutes);
app.use('/foodmania/recipe', soupRoutes);
app.use('/foodmania/recipe', nonvegRoutes);
app.use('/foodmania/contact', contactRoutes);

//Error handler middlewares
app.use(globalErrHandler);

//Listen server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
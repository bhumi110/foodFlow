
const app = require('./app');
const mongoose=require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const MONGO_URL= process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/foodFlow'

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
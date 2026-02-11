require('dotenv').config();
const mongoose = require('mongoose');

const mongoDB = async () => {
    await mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true} ,async(err, result)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("MONGODB CONNECTED!!!");
            const fetched_data= await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err,data){
                if (err){
                    console.log(err)
                }
                else{
                    global.food_items= data;
                }})
                const fetched_category= await mongoose.connection.db.collection("food_category");
                fetched_category.find({}).toArray(function(err,category){
                if (err){
                    console.log(err)
                }
                else{
                    global.food_category= category;
                }
            })
        }
    });
  };
  
  module.exports = mongoDB;
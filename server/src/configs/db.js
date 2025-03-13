const {connect} = require("mongoose");

const connectToDB = async(url) => {
    try{
        await connect(url);
        console.log("Database connected successfully...");
        
    }catch(err){
        console.log(err);
    }
}

module.exports = connectToDB;

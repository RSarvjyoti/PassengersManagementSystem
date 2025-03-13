const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name : {type: String, required : true},
    age : {type: Number, required : true},
    gender : {type: String, required : true, enum : ["female", "male", "other"]},
    contact : {type: Number},
    email : {type: String},
    photo : {type: String},
    id_card :{type: String},
})

const User = model('user', userSchema);
module.exports = User;
const mongoose = require("mongoose")

const {mongo_db} = require("./");

//const MONGO_URI = `${mongo_db.uri}/${mongo_db.name}`
const MONGO_ATLAS = `${mongo_db.mongo_atlas}`

let connection;
(async ()=>{
    try{
        connection = await mongoose.connect(MONGO_ATLAS, {useNewUrlParser:true,useUnifiedTopology:true});
        console.log("coneccion establecida!");
    }catch(error){
        console.log("algo salio mal")
    }
})()

module.exports = {connection,mongoose}
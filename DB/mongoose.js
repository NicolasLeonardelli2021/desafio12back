let {mongoose} = require("../config/mongoDB")
let {Schema, model} = mongoose;

const mensajesCollection = 'mensajes'

const mensajeSchema = new mongoose.Schema({
        mail:{type:String},
        nombre:{type:String},
        apellido:{type:String},
        edad:{type:Number},
        alias: {type:String},
        avatar:{type:String},
        text:{type:String},
        hora:{type:String} 
})

//let mensajeSchemaModel = new Schema(mensajeSchema)
//let mensajeModel = new model('mensajes', mensajeSchemaModel)

module.exports = mongoose.model(mensajesCollection, mensajeSchema)
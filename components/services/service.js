let faker = require("faker");
faker.locale = "es"

class Testing {
async getUsers(cant){
      
    try{
        let respuesta = []
        for (let i = 0; i < cant; i++) {
          
            const obj = {
                id:i +1,
                titulo: faker.commerce.product(),
                precio: faker.commerce.price(),
                url: faker.image.technics(20,20, true) 
                ,
            };
            respuesta.push(obj)
        }
        return respuesta;
    }catch(error){
        console.log(error)
    }
}
}

module.exports = new Testing();
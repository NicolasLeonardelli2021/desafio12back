let testingService = require("../services/service")
class Testing {
 
    async test(){
        try{
            let cant = 5
            let response= await testingService.getUsers(cant);
            return response
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new Testing()
const express = require("express")
const app = express()
let {config} = require("./config");
let controller = require("./components/controllers/controller")
let moment = require("moment")
let cors = require("cors")
let path = require('path')
let {Server: HttpServer} = require('http')
let {Server:SocketIO} = require('socket.io');
const cookieParser = require("cookie-parser")
const session = require("express-session")
let mensajeModel = require("./DB/mongoose")
const MongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser:true,useUnifiedTopology:true}
const PORT = config.port;

app.use(express.static("public"));

app.use(cors("*"));

app.use(express.json());                    
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

 app.use(session({
    //store: new File_store({path: "./sesiones", ttl:300,retries:0}),
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nicolas:nicolas34805446@cluster0.69iyd.mongodb.net/desafioCoder?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),

    secret: "secret",
    resave: true,
    saveUninitialized:true,
      cookie:{
        maxAge:60000
    }  
    

})); 

app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "ejs");

// ----------Socket-----------------
let http = new HttpServer(app);
let io = new SocketIO(http);

      
// Nueva coneccion
io.on("connection", socket =>{
    console.log("Nuevo cliente conectado:", socket.id)
    leerBase();
   
    

    socket.on("nuevoChat",data =>{
        datos={
            ...data,
            hora: moment().format("YYYY-MM-DD HH:mm:ss")
            }
            const mensajeSavemodel =new mensajeModel(datos);
            let mensajeSave = mensajeSavemodel.save()
      
                .then(()=>console.log("mensaje insertado"))
                .catch((err)=> {console.log(err); throw err})

        io.sockets.emit("mensaje",datos)
       
    })
    async function leerBase(){
        try{ 
            let mensajes =  await mensajeModel.find({})
            .then((data)=> socket.emit("iniciarChat",data));
            //.then((data)=>console.log(data));
            
       }catch(error){
           console.log("no se pudo leer la base de datos")
       }
    }
})


    


// -------API REST ------------
app.get("/", (req,res,next) =>{
    const user = getName(req);

    if(user == undefined){       
        res.redirect("login.html");
    }else{
        controller.test()
        .then(array => res.render("",{user,array}))
        .catch(error => console.log(error))
    }    
})



app.get("/login",(req,res,next)=>{
    const user = getName(req);
    if(user == undefined){
        res.redirect("login.html"); 
    }else{
       
        controller.test()
        .then(array => res.render("",{user,array}))
        .catch(error => console.log(error))
        
    }
})
const getName = req =>req.session.name;

app.post("/login", (req,res,next)=>{
    let {name} = req.body;
    if(name != ""){
        req.session.name = name;
        const user = getName(req)
        controller.test()
        .then(array => res.render("index",{user,array}))
        .catch(error => console.log(error))
    }else{
        res.redirect("index.html");
    }
    
})

app.get("/olvidar",(req, res, next)=>{
    let name = getName(req)
    req.session.destroy(err =>{
        if(err) res.json({error: JSON.stringify(err) });
        res.render("logout", {name});      
    })
    
})

http.listen(PORT, ()=>{
   // app.listen(PORT, ()=>{
    console.log(`estamos escuchando en esta url: http://localhost:${PORT}`)
})
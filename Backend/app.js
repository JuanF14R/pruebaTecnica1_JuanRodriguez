import express from "express";//ECMA6
import dotenv from "dotenv";// DEPENDENCIA PARA MANEJAR VARIABLES DE ENTORNO
import { connectionMongo } from "./src/config/dataBase.js";
import { userRouter } from "./src/routes/user.routes.js";


// EL SEGUNDO PASO ES: 2. CONFIGURAR EL USO DE NUESTRO SERVIDOR:
// Dependencia express
const app = express(); 
// Dependencia dotenv
dotenv.config(); // CONFIGURANDO PARA VARIABLES DE ENTORNO. CADA DEPENDENCIA TIENE SU FORMA DE USO, REVISAR DOCUMENTACIÓN. TODAS LAS DEPENDENCIAS SI SE DEBEN IMPORTAR
// Dependencia mongoose
connectionMongo();

//Configutaión de rutas:
app.use(express.json());

app.use('/usuarios', userRouter); 



const port = process.env.PORT;

// EL TERCER PASO ES: 3. EJECUTAR EL SERVIDOR EN NUESTRO COMPUTADOR
app.listen(port, ()=>{
    console.log("El servidor esta ejecutandose correctamente, en el puerto", port);
});


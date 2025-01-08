// 1. Importar las dependencias que se necesitan. Mongosee es la de base de datos
import mongoose from "mongoose";

// SE USA EL EXPORT PARA PODERLA USAR EN EL ARCHIVO APP
export async function connectionMongo (){
    // PARA EVITAR INCONVENIENTES DEBEMOS CONTROLAR LOS ERRORES -> Bloque try -catch
    // try: gestiona cuando la respuesta es positiva.
    // catch: atrapa los errores.

    try {
        // Conexión de la base de datos: 
        await mongoose.connect(process.env.DB_URL,{dbName: 'validacionUsuarios'});
                //Verificación que funciona la conexión
                console.log("Conexión exitosa con la base de datos"); 
    } catch (error) {
        console.error("Error de conexión" + " " + error);
    }
}
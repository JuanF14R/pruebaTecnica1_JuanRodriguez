import { request, response } from "express";
import { verificarToken } from "../lib/jwt.js";


export function auth (reqRole) {

    return async (Request, response, next) => {


        //Verificación de la existencia del token

        let token = request.headers["authorization"];
        console.log("token obtenido en la cabecera" + token);

        if(!token){
            return response.status(401).json({
                mensaje:'No se encontro Token, permiso denegado'
            });
        }

        //Verificamos que el token sea permitido

        token = token.split("")[1];
        console.log('token separado' + token);

        //Manejo de errores

        try {

            const decoded = await verificarToken (token);
            console.log('token decodificado', decoded);

            //Guardar info condificada en la petición

            request.user = decoded;
            
        } catch (error) {
            return response.status(400).json({
                mensaje:' Fallo en la autenticación del token',
                problema: error.message || error            
            });
        }
        next();
    }
}
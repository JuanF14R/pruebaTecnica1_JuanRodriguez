import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.SECRET_KEY;

//Funciones necesrias para generar token

export function generacionToken (payload){


    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, {expiresIn: "1h"}, (error, token) => {

            if(error){
                reject(new Error('Error al generar JWT' + error.message));
            }else{
                resolve(token);
            }
        });
    });
}

//Funcion para garantizar la seguridad del token

export const verificarToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) =>{
            if(error){

                reject(new Error('Error al verificar JWT'+ error.message));
            }else {
                resolve(decode);
            }
        });
    });
}
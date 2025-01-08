import { userModel } from "../models/Users.models.js";
import { generacionToken } from "../lib/jwt.js";
import bcrypt from "bcryptjs";
import { request } from "express";

export async function inicioSesion(request, res) {

    //Manejo de errores

    try {

        const {emailLogin, passwordLogin} = request.body;

        //Buscar que el email exista en la BD

        const buscarUsuario = await userModel.findOne({
            email: emailLogin
        });

        if(!buscarUsuario){

            return res.status(404).json({
                mensaje:'Usuario no registrado'
            });
        }

        // Ahora vamos a validar la contraseña

        const validacionContraseña = await bcrypt.compare(passwordLogin, buscarUsuario.password);

        if(!validacionContraseña){
            return res.status(401).json({
                mensaje:'Contraseña incorrecta, valida la información ingresada'
            });
        }

        const payload = {
            id: buscarUsuario._id,
            name: buscarUsuario.firstName
        }


        const token = await generacionToken(payload);

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            tokenGenerado: token
        });
        
    } catch (error) {

        return res.status(400).json({
            mensaje:'Error al iniciar sesión',
            error: error.message || error
        });
        
    }
    
}

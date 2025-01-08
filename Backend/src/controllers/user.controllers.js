import { request, response } from "express";
import { userModel } from "../models/Users.models.js";
import bcrypt from "bcryptjs";


//PETICIONES HTTP O CRUD

//1. POST /CREAR

export const crearUsuario = async (req, res) => {

    //Manejo de errores
    try {

        //Establcer los componentes del modelo usuario

        const {firstName, lastName, email, password} = req.body;

        //Vamos a encriptar la contraseña

        const contrasenaEncriptada = await bcrypt.hash(password, 5);

        const nuevoUsuario = await userModel.create({
            firstName,
            lastName,
            email,
            password:contrasenaEncriptada
        });

        //Arrojamos mensaje de creación exitosa

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            datos: nuevoUsuario
        });
    } catch (error) {
        return res.status(400).json({
            mensaje:'Ocurrio un error al crear el usuario',
            problema: error || error.message
        })
    }
}


//2. GET / OBTENER USUARIOS

export const obtenerUsuarios = async (req, res) => {

    // try catch para manejo de errores
    try {

        //Primero encuentra todos los usuarios en base de datos
        let usuarios = await userModel.find();
        //En caso de que no haya información en la base de datos:

        if(usuarios.length === 0){
            return res.status(200).json({
                mensaje: 'Aún no se ha registrado ningún usuario, base de datos vacia'
            })
        }

        return res.status(200).json({
            mensaje: 'Se encontraron usuarios almacenados',
            numeroUsuarios: usuarios.length,
            datos: usuarios
        })
        
    } catch (error) {
        return res.status(400).json({
            mensaje:'Ocurrió un error no es posible obtener usuarios',
            problema: error || error.message
        })
        
    }
}

//3.PUT / ACTUALIZAR USUARIO

export const actualizarUsuarioPorId = async (req, res) => {

    // Manejo de errores

    try {

        let idDeActualizar = req.params.id;
        let infoDeActualizar = req.body;

        const usuarioActualizado = await userModel.findByIdAndUpdate(idDeActualizar, infoDeActualizar);

        // await usuarioActualizado.save();

        //Validación cuando el email no existe:

        if (!usuarioActualizado){
            return res.status(404).json({
                mensaje:'Usuario no encontrado, valida si estas ingresando el email registrado'
            });
        }

        return res.status(200).json({
            mensaje:'Se actualizo correctamente el usuario',
            datos:infoDeActualizar
        });
        
    } catch (error) {
        return res.status(400).json({
            mensaje:'Ocurrio un error al actualizar el usuario',
            error: error || error.message
        })
        
    }
}

//4. DELETE // BORRAR USUARIOS

export const eliminarUsuariosPorId = async (req, res) => {

    try {
        
        let idUsuarioEliminar = req.params.id;

        await userModel.findByIdAndDelete(idUsuarioEliminar);
        return res.status(200).json({
            mensaje:'Usuario eliminado satisfatoriamente'
        });

    } catch (error) {
        
        return res.status(400),json({
            mensaje:'Ocurrio un error al eliminar el usuario',
            error: error || error.message
        })
    }
}
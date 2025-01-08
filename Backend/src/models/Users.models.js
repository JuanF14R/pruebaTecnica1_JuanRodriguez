// Importamos base de datos de mongoose para manejo en baso de datos

import mongoose from "mongoose";

//Creación del modelo o esquema de la estructiura para la información de cada usuario

const modeloUsuario = new mongoose.Schema ({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
})

export const userModel = mongoose.model("user", modeloUsuario);
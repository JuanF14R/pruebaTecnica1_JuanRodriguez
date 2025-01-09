import { crearUsuario } from "../controllers/user.controllers.js";
import { auth } from "../middleware/auth.js";


import express from "express";

//Configuramos express y el router

export const userRouter = express.Router();

userRouter.post('/crear', crearUsuario);
// userRouter.get('/obtener', obtenerUsuarios);
// userRouter.put('/actualizar/:id', actualizarUsuarioPorId);
// userRouter.delete('/eliminar/:id', eliminarUsuariosPorId);



import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../interface/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  private _httpClient = inject(HttpClient);

  // URL de nuestros clientes
  private URL_USUARIOS = "http://localhost:3000/usuarios";

  // Peticion POST
  postUsuarios(user: Usuarios){
    return this._httpClient.post(this.URL_USUARIOS + "/crear", user);
  }
  
}

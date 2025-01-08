import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";
import { Credenciales } from '../interface/credenciales';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  public _toastrService = inject(ToastrService);

  //Creación de ruta de conexión al Back
  private URL_LOGIN = 'http://localhost:3000/iniciarSesion/';

  inicioSesionUsuario(credencialesUsuario:Credenciales){

    return this._httpClient.post(this.URL_LOGIN, credencialesUsuario);
  
  }

  obtenerToken(){
    return localStorage.getItem('token');
  }

  redireccionar(){
    this._router.navigate(['/']);
  }

  estaLogueado(){
    return this.obtenerToken()? true : false;
  }
  
  cierreSesion(){
    this._toastrService.info('Cierre de sesión exitoso, gracias por tú visita');

    localStorage.removeItem('token');

    this._router.navigate(['/inicioSesion']);

  }

  

  
}

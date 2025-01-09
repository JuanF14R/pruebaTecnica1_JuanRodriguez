import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LoginServiceService } from '../../service/login.service.service';
import { Credenciales } from '../../interface/credenciales';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //Inicialmente injectamos dependencias
  _loginServiceService = inject(LoginServiceService);
  _toastrService = inject(ToastrService);

  //Conectamos formulario:

  formularioLogin = new FormGroup({
    email : new FormControl(''),
    password: new FormControl('')
  });

  //Es una función que me controla lo que suceda on el formulario l dar click en el botn submit
  handleSubmint(){
    //Lo que queremos en este caso es que me muestre en consola la información que se esta reciviendo del formulario


    const emailLogin = this.formularioLogin.value.email;
    const passwordLogin = this.formularioLogin.value.password;


   let CredencialesIngreso: Credenciales | null = null;


   if(typeof emailLogin === 'string' && typeof passwordLogin === 'string'){

    CredencialesIngreso = {
      
      emailLogin,
      passwordLogin,
      
      
    }
    console.log(CredencialesIngreso);
   }

   // GESTION PARA LA PETICIÓN POST PARA REALIZAR PETICIÓN AL BACK

   if(CredencialesIngreso){
    this._loginServiceService.inicioSesionUsuario(CredencialesIngreso).subscribe({
      next: (res: any) => {
        console.log(res)
        if(res){
          localStorage.setItem('token', res.tokenGenerado)
          this._loginServiceService.redireccionar();
          this._toastrService.success(res.mensaje);
        }
      },

      error: (err) =>{
        console.log(err.error.mensaje);
        this._toastrService.error(err.error.mensaje || 'Ocurrio un error al iniciar sesión');
        this.formularioLogin.reset();
      }
    })
   }
  }
}

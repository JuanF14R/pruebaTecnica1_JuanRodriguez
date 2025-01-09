import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Usuarios } from '../../interface/usuarios';
import { UsuariosServiceService } from '../../service/usuarios.service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  _usuariosServiceService = inject(UsuariosServiceService);
  _toastrService = inject(ToastrService);
  _Router = inject(Router);

  formularioRegistro = new FormGroup({

    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  handleSubmint() {
    //Lo que queremos en este caso es que me muestre en consola la información que se esta reciviendo del formulario

    console.log("Entre al metodo");

    const firstName = this.formularioRegistro.value.firstName;
    const lastName = this.formularioRegistro.value.lastName;
    const email = this.formularioRegistro.value.email;
    const password = this.formularioRegistro.value.password;

    


    let CredencialesRegistro: Usuarios | null = null;
    
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(password);

    if (typeof firstName === 'string' && typeof lastName === 'string' && typeof email === 'string' &&  typeof password === 'string') {

      CredencialesRegistro = {

        firstName,
        lastName,
        email,
        password

      }

      // console.log(CredencialesRegistro);
  
    }
    

    if (CredencialesRegistro) {
      this._usuariosServiceService.postUsuarios(CredencialesRegistro).subscribe({
        next: (res: any) => {
          console.log(res);


          this._toastrService.success(res.mensaje);

          this._Router.navigate(['/inicioSesion']);
        },

        error: (err) => {
          console.log(err.error.mensaje);
          this._toastrService.error(err.error.mensaje || 'Ocurrio un error al registrar el usuario');
          this.formularioRegistro.reset();
        }

      })
    }

  }

}

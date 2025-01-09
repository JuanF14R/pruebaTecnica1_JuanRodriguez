import { Routes } from '@angular/router';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { NotFoundComponent } from './paginas/not-found/not-found.component';



export const routes: Routes = [

    {path: '', component: InicioComponent, title: 'Inicio'},
    {path: 'registro', component: RegistroComponent, title: 'Registro'},
    {path: 'inicioSesion', component: LoginComponent, title: 'InicioSesión'},
    {path: '**', component: NotFoundComponent, title: 'Error 404'}

];

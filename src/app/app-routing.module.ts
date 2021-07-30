
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

// we define the main routes of our application
export const appRoutes: Routes = [
    {path: 'login', component : LoginComponent},
    {path: 'registro',component:RegistroComponent},
    {path: '**', component : LoginComponent},
    
    
];
export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true });
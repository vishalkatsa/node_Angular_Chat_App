import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { protectGuard } from './auth/protect.guard';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"singup",component:SingupComponent},
    {path:"chatpage",canActivate:[protectGuard] ,component:DashboardComponent},
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { AuthGuard } from './guard/auth.guard';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { NavComponent } from './modules/nav/nav.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuarios', component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Usuario'] }
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Usuario'] }
  },
  {
    path: 'nav',
    component: NavComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Usuario'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

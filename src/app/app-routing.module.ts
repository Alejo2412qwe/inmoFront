import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { AuthGuard } from './guard/auth.guard';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { NavComponent } from './modules/nav/nav.component';
import { AlugueisComponent } from './modules/alugueis/alugueis.component';
import { CadUsuarioComponent } from './modules/cad-usuario/cad-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'cadUsuarios', component: CadUsuarioComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador'] }
  },
  {
    path: 'usuarios', component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador'] }
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Empleado'] }
  },
  {
    path: 'nav',
    component: NavComponent
  },
  {
    path: 'alugueis', component: AlugueisComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Empleado'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

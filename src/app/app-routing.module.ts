import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { AuthGuard } from './guard/auth.guard';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { NavComponent } from './modules/nav/nav.component';
import { AlugueisComponent } from './modules/alugueis/alugueis.component';
import { CadUsuarioComponent } from './modules/cad-usuario/cad-usuario.component';
import { InfoaluguelComponent } from './modules/infoaluguel/infoaluguel.component';
import { AdminpanelComponent } from './modules/adminpanel/adminpanel.component';
import { ComprovantesComponent } from './modules/comprovantes/comprovantes.component';
import { ContratoComponent } from './modules/contrato/contrato.component';
import { PerfilComponent } from './modules/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'nav', component: NavComponent
  },
  {
    path: 'edit-usuario/:id/:mode',
    component: CadUsuarioComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Dono'] }
  },
  {
    path: 'admin', component: AdminpanelComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Dono'] }
  },
  {
    path: 'contratos', component: ContratoComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Propietario', 'Dono'] }
  },
  {
    path: 'cadUsuarios', component: CadUsuarioComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Dono'] }
  },
  {
    path: 'comprovantes', component: ComprovantesComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Dono'] }
  },
  {
    path: 'usuarios', component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Dono'] }
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Empleado', 'Dono'] }
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'edit-alu/:id/:mode',
    component: CadastroComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Custodio', 'Dono'] }
  },
  {
    path: 'alugueis', component: AlugueisComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Empleado', 'Propietario', 'Dono'] }
  },
  {
    path: 'infoAluguel/:id', component: InfoaluguelComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['Administrador', 'Empleado', 'Propietario', 'Inquilino', 'Dono'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

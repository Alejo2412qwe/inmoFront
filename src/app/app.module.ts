import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { TokenExpirationInterceptor } from './enviroment/TokenExpirationInterceptor';
import { NavComponent } from './modules/nav/nav.component';
import { ButtomMenuComponent } from './components/buttom-menu/buttom-menu.component';
import { AlugueisComponent } from './modules/alugueis/alugueis.component';
import { CadUsuarioComponent } from './modules/cad-usuario/cad-usuario.component';
import { InfoaluguelComponent } from './modules/infoaluguel/infoaluguel.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { AdminpanelComponent } from './modules/adminpanel/adminpanel.component';
import { ComprovantesComponent } from './modules/comprovantes/comprovantes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    CadastroComponent,
    NavComponent,
    ButtomMenuComponent,
    AlugueisComponent,
    CadUsuarioComponent,
    InfoaluguelComponent,
    LoadingScreenComponent,
    AdminpanelComponent,
    ComprovantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpirationInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

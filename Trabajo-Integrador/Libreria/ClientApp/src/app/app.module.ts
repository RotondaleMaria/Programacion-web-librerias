import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
//import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LibreriaComponent } from './libreria/libreria.component';
import { LibroComponent } from './libro/libro.component';
import { FormularioLibreriaComponent } from './libreria/formulario-libreria/formulario-libreria.component';
import { FormularioLibroComponent } from './libro/formulario-libro/formulario-libro.component';
import { GrillalibreriaComponent } from './libreria/grillalibreria.component';
import { LibreriacardComponent } from './libreria/libreriacard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { GuardPaginaService } from './servicios/guard-pagina.service';
import { InterceptorService} from './servicios/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    //FetchDataComponent,
    LibreriaComponent,
    LibroComponent,
    FormularioLibreriaComponent,
    FormularioLibroComponent,
    GrillalibreriaComponent,
    LibreriacardComponent,
    LoginComponent,
    registroComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [GuardPaginaService] },
      { path: 'counter', component: CounterComponent,canActivate: [GuardPaginaService]},
    //  { path: 'fetch-data', component: FetchDataComponent },
      { path:'libreria', component: LibreriaComponent,canActivate: [GuardPaginaService]},
      { path:'libro', component: LibroComponent,canActivate: [GuardPaginaService]},
      { path: 'libreria-nuevo',component:FormularioLibreriaComponent,canActivate: [GuardPaginaService]},
      { path: 'libreria-editar/:id', component:FormularioLibreriaComponent ,canActivate: [GuardPaginaService]},
      { path: 'libro-nuevo',component:FormularioLibroComponent ,canActivate: [GuardPaginaService]},
      { path: 'libro-editar/:id', component:FormularioLibroComponent ,canActivate: [GuardPaginaService]},
      { path: 'grilla-libreria', component:GrillalibreriaComponent ,canActivate: [GuardPaginaService]},
      { path: '', component: LoginComponent },
      { path: 'registro', component:registroComponent},
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

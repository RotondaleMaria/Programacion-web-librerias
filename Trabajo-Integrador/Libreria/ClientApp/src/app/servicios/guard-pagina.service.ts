import { Injectable } from '@angular/core'; 
import { Router, CanActivate } from '@angular/router';
import { AutenticacionService} from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPaginaService implements CanActivate {

  constructor(private srvAutenticacion: AutenticacionService, private router: Router) { }

  canActivate() {
      //Si no está logueado lo envia a la pagina principal o la que defina por ej /productos
      if (!this.srvAutenticacion.estaLogueado()) {
          console.log('No estás logueado');
          this.router.navigate(['/']);
          return false;
      }

      return true;
  }
}

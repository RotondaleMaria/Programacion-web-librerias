import { Component } from '@angular/core';
import { ListadoService } from './servicios/listado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[ListadoService],
})
export class AppComponent {
  title = 'proxy';
  constructor(private listadoSvc: ListadoService){}
  ngOnInit() {
  }
  
}




import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Libreria } from '../modelos/libreria';
import { ListadoService } from '../servicios/listado.service'

@Component({
  selector: 'app-libreriacard',
  templateUrl: './libreriacard.component.html',
  styleUrls: ['./libreriacard.component.css']
})
export class LibreriacardComponent implements OnInit {

  @Input()itemLibreria:Libreria;
  @Output() borrarLibreria: EventEmitter<number> = new EventEmitter();

  constructor(){}

  ngOnInit() {
  }

  Borrar(id:number){
    this.borrarLibreria.emit(id);
  }

}

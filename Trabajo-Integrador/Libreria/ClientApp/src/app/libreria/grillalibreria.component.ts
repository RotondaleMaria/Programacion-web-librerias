import { Component, OnInit } from '@angular/core';
import {Libreria} from '../modelos/libreria';
import {LibreriaService} from '../servicios/libreria.service';
import { ListadoService } from '../servicios/listado.service'


@Component({
  selector: 'app-grillalibreria',
  templateUrl: './grillalibreria.component.html',
  styleUrls: ['./grillalibreria.component.css']
})
export class GrillalibreriaComponent implements OnInit {

ListadoLibreria:Libreria[];
seleccionado:number;

  constructor(private servicioListado: ListadoService) { }

  ngOnInit() {

    this.CargarListado()

  }

  CargarListado() {

    this.servicioListado.MostrarTodos().subscribe(
      data => {
        this.ListadoLibreria = data

      }
    );
  }

  respuesta(id:number){
    console.log("Borrar la libreria con Id: " + id);
    this.seleccionado=id;

  }

}

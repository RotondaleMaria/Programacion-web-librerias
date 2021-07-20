import { Component, OnInit } from '@angular/core';
import {Libro} from '../modelos/libro';
//import {LibroService} from '../servicios/libro.service';
import { ListadoLibrosService} from '../servicios/listado-libros.service'

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
  
})
export class LibroComponent implements OnInit {
  [x: string]: any;

  public ListadoLibro: Libro[];
  public Titulo:string;
  public campobuscado:string;
  page:number= 1;
  title = 'proxy'
  
  

  constructor(private servicioLibro:ListadoLibrosService) { }

  ngOnInit() {

    this.CargarListado()
  }

  
  CargarListado() {

    this.servicioLibro.MostrarTodos().subscribe(
      data => {
        this.ListadoLibro = data

      }
    );
  }


    BuscarPorTitulo(libroId){

    }

    BuscarLibro() {
      
      if(this.campobuscado != null && this.campobuscado != "" ){
        this.servicioLibro.BuscarPorTitulo(this.campobuscado).subscribe(
          data => {
            
            this.ListadoLibro = data
          },
          err => console.log(err)
        );
      }else{
        this.CargarListado()
      }
      
    }
  

    Borrar(libreriaId: number) {
      this.servicioLibro.Borrar(libreriaId).subscribe(
        data => {
          this.CargarListado() 
        },
        err => console.log(err)
      );
    }

}

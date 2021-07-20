import { Injectable } from '@angular/core';
import {Libro} from '../modelos/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

constructor() { }

public ListadoLibro : Libro[]=[
    {id:0, titulo:"Cuando comen los leones" , autor:"Wilbur Smith", editorial:"Emece",genero:"Novela", stock:true},
    {id:1, titulo:"Costa ardiente" , autor:"Wilbur Smith", editorial:"Emece",genero:"Novela", stock:false },
    {id:2, titulo:"Harry Potter y la Piedra Filosofal" , autor:"JK Rowling", editorial:"Salamandra",genero:"Literatura fantástica", stock:true },
    {id:3, titulo:"Harry Potter y la Cámara Secreta " , autor:"JK Rowling", editorial:"Salamandra",genero:"Literatura fantástica", stock:true },
    {id:4, titulo:"El caballero de la armadura oxidada" , autor:"Robert Fisher", editorial:"Ediciones Obelisco",genero:"Ficcion", stock:false },
    {id:5, titulo:"Don Quijote de la Mancha" , autor:"Miguel de Cervantes", editorial:"Francisco de Robles",genero:"Fantasía romántica" , stock:true},
    {id:6, titulo:"El Hobbit" , autor:"J.R.R. Tolkien", editorial:"Planeta",genero:"Literatura fantástica", stock:true },
    {id:7, titulo:"Orgullo y Prejuicio" , autor:"Jane Austen", editorial:"Planeta",genero:"Drama",stock:false }
  ];

  CrearId(){
    return this.ListadoLibro.length + 1
  } 

  MostrarTodos():Libro[] {
      return this.ListadoLibro.slice();
  }

  Buscar(librId:number):Libro{
    librId = + librId;
    return this.ListadoLibro.find(x=> x.id === librId);
  }

  Crear(libro:Libro) {
    this.ListadoLibro.unshift(libro);
  }

  Editar(libro:Libro) {
    
    console.log("Modificar libro: " + libro.titulo + " " + libro.autor);
    var indice= this.ListadoLibro.findIndex(x=> x.id === libro.id);
    this.ListadoLibro[indice]=libro;
    
    }

    BuscarPorTitulo(titu:string):Libro[]{
      return this.ListadoLibro.filter(x=> x.titulo.toLowerCase() === titu.toLowerCase());
  }

  BorrarLibro(librId:number): any {
    
    this.ListadoLibro.forEach((value,index) =>{
      if (value.id == librId)
        this.ListadoLibro.splice(index,1)
    });
    return 0;
  }

}

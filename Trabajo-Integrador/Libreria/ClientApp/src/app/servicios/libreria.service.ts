import { Injectable } from '@angular/core';
import {Libreria} from '../modelos/libreria';

@Injectable({
  providedIn: 'root'
})
export class LibreriaService {

constructor() { }

public ListadoLibreria:Libreria[]=[

        {id:0 ,nombre: "Cuspide", direccion: " Juncal 3091", telefono:48215566, horario: (" 9 a 18"), descuento: true},
        {id:1 ,nombre: "El Atico Azul", direccion: "Bustamante 810", telefono:42941856, horario: "11 a 21",descuento: false},
        {id:2 ,nombre: "El Buho", direccion: "Moreno 5236", telefono:41269985, horario: "10 a 18",descuento: true},
        {id:3 ,nombre: "El Aprendiz", direccion: "Rodriguez Peña 3091", telefono:48559633, horario: "11 a 21",descuento: false},
        {id:4 ,nombre: "Mundo Creativo", direccion: "Mitre 1502", telefono:48277626, horario: "9 a 18",descuento: true},
        {id:5 ,nombre: "La Torre de Libros", direccion: " Arenales 702", telefono:48222022, horario: " 9 a 18",descuento: false}
    
      ];

CrearId(){
  return this.ListadoLibreria.length + 1
} 

MostrarTodos():Libreria[]{
  
    return this.ListadoLibreria.slice();

  }
BorrarLibreria(libId:number): any {
    
    this.ListadoLibreria.forEach((value,index) =>{
      if (value.id == libId)
        this.ListadoLibreria.splice(index,1)
    });
    return 0;
  }

Buscar(libId:number):Libreria{
  libId = + libId;
  return this.ListadoLibreria.find(x=> x.id === libId);
}

  BuscarPorNombre(nom:string):Libreria[]{
    return this.ListadoLibreria.filter(x=> x.nombre.toLowerCase() === nom.toLowerCase());
}


  Crear(libreria:Libreria) {
    this.ListadoLibreria.unshift(libreria);

  }
  Editar(libreria:Libreria) {
  console.log("Modificar libreria: " + libreria.nombre + " " + libreria.direccion);

  var indice= this.ListadoLibreria.findIndex(x=> x.id === libreria.id);
  this.ListadoLibreria[indice]=libreria;
  }
}

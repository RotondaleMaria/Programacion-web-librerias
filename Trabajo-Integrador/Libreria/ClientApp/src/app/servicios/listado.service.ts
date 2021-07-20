import { Injectable } from '@angular/core';
import { Listado } from '../modelos/listado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libreria } from '../modelos/libreria';


@Injectable()
export class ListadoService {

  private apiURL : string="https://localhost:5000/" + "api/Librerias"

  constructor(private http: HttpClient) { }

  MostrarTodos(): Observable<any>{
    return this.http.get<any>('/api/Librerias');
  }



  BuscarPorNombre(nombre:string):Observable<Libreria[]> {
    return this.http.get<Libreria[]>("/api/Librerias/buscar/" + nombre);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  Crear(lib:Libreria): Observable<Libreria>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Libreria>('api/Librerias',lib, httpOptions);

  }


  Editar(lib:Libreria): Observable<Libreria>{

    const headers={ 
      'Accept': 'application/json', 'Content-type':'aplication/json'
    }
    return this.http.put<Libreria>('/api/Librerias/' + lib.id, lib, this.httpOptions);
  }


  Borrar(listId:number): Observable<any>{
    console.log(listId);
    return this.http.delete<any>('/api/Librerias/' + listId)
    
  }

  Buscar(libreriaId:number):Observable<Libreria>{
    libreriaId = + libreriaId;
    return this.http.get<Libreria>('/api/Librerias/' + libreriaId);
  
  }
}

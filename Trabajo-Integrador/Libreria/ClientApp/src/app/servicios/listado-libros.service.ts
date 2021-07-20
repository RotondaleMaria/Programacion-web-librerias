import { Injectable } from '@angular/core';
//import { Listado } from '../modelos/listado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListadoLibros} from '../modelos/listado-libros';
import { Libro } from '../modelos/libro';

@Injectable({
  providedIn: 'root'
})
export class ListadoLibrosService {
  private apiURL : string="https://localhost:5000/" + "api/Libro"


  constructor(private http: HttpClient) { }

  MostrarTodos(): Observable<any>{
    return this.http.get<any>('/api/Libro');
  }



  BuscarPorTitulo(titulo:string):Observable<Libro[]> {
    return this.http.get<Libro[]>("/api/Libro/buscar/" + titulo);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  Crear(libr:ListadoLibros): Observable<ListadoLibros>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<ListadoLibros>('api/Libro',libr, httpOptions);
  }


  Editar(libr:ListadoLibros): Observable<ListadoLibros>{

    const headers={ 
      'Accept': 'application/json', 'Content-type':'aplication/json'
    }
    return this.http.put<ListadoLibros>('/api/Libro/' + libr.id, libr, this.httpOptions);
  }

  Borrar(listId:number): Observable<any>{
    console.log(listId);
    return this.http.delete<any>('/api/Libro/' + listId)
  }

  Buscar(libroId:number):Observable<ListadoLibros>{
    libroId = + libroId;
    return this.http.get<ListadoLibros>('/api/Libro/' + libroId);
  
  }
}

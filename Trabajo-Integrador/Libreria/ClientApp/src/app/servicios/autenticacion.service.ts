import { Injectable,Inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../modelos/user'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private apiURL= this.baseUrl + 'api/login';
  
  constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl:
  string) {
      // console.log("REGISTRO GUARDADO", localStorage.getItem('UsuarioGuardado'));
      // this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
      // this.currentUser = this.currentUserSubject.asObservable();
      
  }


  login(userName: string, password: string) {
      console.log("Usuario: " + userName);
      
      const UsuarioApi: User={
        userName:userName,
        password:password,
        fullName:"",
        userRole:"",  
        firstName: "",
        lastName: "", 
        token: "" 
      };
        
      return this.http.post<any>(this.apiURL, UsuarioApi)
          .pipe(
            map(respuesta => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log("Respuesta api: ",respuesta);
                localStorage.setItem('UsuarioGuardado', JSON.stringify(respuesta));  
                return respuesta;
            })
            
          ); 
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('UsuarioGuardado'); 
  }

  estaLogueado(){
    var logueado=false;

    var user = JSON.parse(localStorage.getItem('UsuarioGuardado'));
    console.log(user);
    if (user){
      const token = user["token"];
      console.log("ESTA LOGUEADO: ", token )
      logueado=true;
    }
    return logueado;
  }

}

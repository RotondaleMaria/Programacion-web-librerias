import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var user = JSON.parse(localStorage.getItem('UsuarioGuardado'));
    
    if (!user) {
      console.log("Pasa por interceptor");
      return next.handle(req);
    }
    
    const headers = req.clone({ 
        headers: req.headers.set('Authorization', `Bearer ${user["token"]}`)
    });
  
    return next.handle(headers);
}
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router: Router) { }

  login(datos){
 /*   let headers: HttpHeaders = new HttpHeaders({
     'Content-Type':'application/json',
     'token': localStorage.getItem('token')
   }) */
    return this.http.post(environment.SERVICIOS_INICIA_SESION,datos);
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}

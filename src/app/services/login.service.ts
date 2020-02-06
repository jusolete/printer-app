import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient ) { }

  login(datos){
 /*   let headers: HttpHeaders = new HttpHeaders({
     'Content-Type':'application/json',
     'token': localStorage.getItem('token')
   }) */
    return this.http.post(environment.SERVICIOS_INICIA_SESION,datos);
  }

}

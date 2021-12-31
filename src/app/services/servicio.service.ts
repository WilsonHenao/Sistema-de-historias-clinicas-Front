import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private http: HttpClient
  ) { }

  public enviarEntidad(entidad: any){
    return this.http.post<any>("http://localhost:8080/entidadDeSalud", entidad);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public listarEntidad(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/entidadDeSalud");
  }

  public eliminarEntidad(idEntidad: any){
    return this.http.delete<any>("http://localhost:8080/entidadDeSalud?id=" + idEntidad);
  }

  public actualizarEntidad(entidad: any){
    return this.http.put<any>("http://localhost:8080/entidadDeSalud", entidad);
  }


    public enviarPersonalMedico(personal: any){
    return this.http.post<any>("http://localhost:8080/personalMedico", personal);
  }

  public listarPersonalMedico(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/personalMedico");
  }

  public eliminarPersonalMedico(idPersonal: any){
    return this.http.delete<any>("http://localhost:8080/personalMedico?id=" + idPersonal);
  }

  public actualizarPersonalMedico(personal: any){
    return this.http.put<any>("http://localhost:8080/personalMedico", personal);
  }
}

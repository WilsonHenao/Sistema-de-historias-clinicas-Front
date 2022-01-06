import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../model/Consulta';
import { ContactoDeEmergencia } from '../model/ContactoDeEmergencia';
import { EntidadDeSalud } from '../model/EntidadDeSalud';
import { Urgencias } from '../model/Urgencias';

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

  public listarEntidad(): Observable<EntidadDeSalud[]>{
    return this.http.get<EntidadDeSalud[]>("http://localhost:8080/entidadDeSalud");
  }

  public eliminarEntidad(idEntidad: any){
    return this.http.delete<any>("http://localhost:8080/entidadDeSalud?id=" + idEntidad);
  }

  public actualizarEntidad(entidad: any){
    return this.http.put<any>("http://localhost:8080/entidadDeSalud", entidad);
  }

  public buscarEntidad(id: any){
    return this.http.get<any>("http://localhost:8080/entidadDeSalud/" + id);
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




  public enviarPaciente(paciente: any){
    return this.http.post<any>("http://localhost:8080/paciente", paciente);
  }

  public listarPaciente(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/paciente");
  }

  public eliminarPaciente(idPaciente: any){
    return this.http.delete<any>("http://localhost:8080/paciente?id=" + idPaciente);
  }

  public actualizarPaciente(paciente: any){
    return this.http.put<any>("http://localhost:8080/paciente", paciente);
  }



  public enviarContacto(contacto: any): Observable<ContactoDeEmergencia>{
    return this.http.post<any>("http://localhost:8080/contacto", contacto);
  }

  public listarContacto(): Observable<ContactoDeEmergencia[]>{
    return this.http.get<any>("http://localhost:8080/contacto");
  }

  public eliminarContacto(idContacto: any){
    return this.http.delete<any>("http://localhost:8080/contacto?id=" + idContacto);
  }

  public actualizarContacto(contacto: any){
    return this.http.put<any>("http://localhost:8080/contacto", contacto);
  }


  public enviarHistoriaClinica(historia: any){
    return this.http.post<any>("http://localhost:8080/historiaClinica", historia);
  }

  public listarHistoriasClinicas(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/historiaClinica");
  }

  public eliminarHistoriaClinica(idHistoria: any){

  }

  public actualizarHistoriaClinica(historia: any){
    
  }


  public enviarConsulta(consulta: any): Observable<Consulta>{
    return this.http.post<any>("http://localhost:8080/consulta", consulta);
  }

  public listarConsulta(): Observable<Consulta[]>{
    return this.http.get<any>("http://localhost:8080/consulta");
  }

  public eliminarConsulta(idConsulta: any){
    return this.http.delete<any>("http://localhost:8080/consulta?id=" + idConsulta);
  }

  public actualizarConsulta(historia: any){
    
  }


  public enviarUrgencias(urgencias: any): Observable<Urgencias>{
    return this.http.post<any>("http://localhost:8080/urgencias", urgencias);
  }

  public listarUrgencias(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/urgencias");
  }

  public eliminarUrgencias(idHistoria: any){

  }

  public actualizarUrgencias(historia: any){
    
  }


  public enviarProcedimiento(procedimiento: any){
    return this.http.post<any>("http://localhost:8080/procedimientos", procedimiento);
  }

  public listarProcedimiento(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/procedimientos");
  }

  public eliminarProcedimiento(idHistoria: any){

  }

  public actualizarProcedimiento(historia: any){
    
  }


  public enviarHospitalizacion(hospitalizacion: any){
    return this.http.post<any>("http://localhost:8080/hospitalizacion", hospitalizacion);
  }

  public listarHospitalizacion(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/hospitalizacion");
  }

  public eliminarHospitalizacion(idHistoria: any){

  }

  public actualizarHospitalizacion(historia: any){
    
  }
}

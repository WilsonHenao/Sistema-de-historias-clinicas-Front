import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/model/Consulta';
import { HistoriaClinica } from 'src/app/model/HistoriaClinica';
import { Paciente } from 'src/app/model/Paciente';
import { PersonalMedico } from 'src/app/model/PersonalMedico';
import { Urgencias } from 'src/app/model/Urgencias';
import { Procedimientos } from 'src/app/model/Procedimientos';
import { Hospitalizacion } from 'src/app/model/Hospitalizacion';
import { ServicioService } from 'src/app/services/servicio.service';

type HistoriaClinicaData = {
  historiaClinica: HistoriaClinica;
  tipo: 'nuevo' | 'editar'
}

type TipoHistoriaClinica = {
  nombre: string;
};

type CausasExternas = {
  nombre: string;
}

type Conductas = {
  nombre: string;
}

@Component({
  selector: 'app-historia-clinica-dialog',
  templateUrl: './historia-clinica-dialog.component.html',
  styleUrls: ['./historia-clinica-dialog.component.css']
})
export class HistoriaClinicaDialogComponent implements OnInit {

  public minDate: Date | undefined;
  public maxDate: Date | undefined;

  public historia: HistoriaClinica = new HistoriaClinica();
  public consulta: Consulta = new Consulta();
  public urgencias: Urgencias = new Urgencias();
  public procedimientos: Procedimientos = new Procedimientos();
  public hospitalizacion: Hospitalizacion = new Hospitalizacion();
  
  public formHistoriaClinica: FormGroup;
  public formConsulta: FormGroup;
  public formUrgencias: FormGroup;
  public formProcedimientos: FormGroup;
  public formHospitalizacion: FormGroup;

  public personalMedico: PersonalMedico[] = new Array<PersonalMedico>();
  public pacientes: Paciente[] = new Array<Paciente>();
  public tipo: 'nuevo' | 'editar';
  tiposHC: TipoHistoriaClinica[] = [
    { nombre: 'Consulta' },
    { nombre: 'Urgencias'}
  ];

  causasExternas: CausasExternas[] = [
    {nombre: 'Accidente de IPS trabajo'},
    {nombre: 'Accidente de transito'},
    {nombre: 'Evento catastrófico'},
    {nombre: 'Lesión por agresión'},
    {nombre: 'Lesión auto inflingida'},
    {nombre: 'Maltrato'},
    {nombre: 'Enfermedad general'},
    {nombre: 'Enfermedad profesional'},
  ]

  conductas: Conductas[] = [
    {nombre: 'Prescripcion de medicamentos'},
    {nombre: 'Ordenación de procedimientos'},
    {nombre: 'Ninguna'}
  ]

  conducta: Conductas[] = [
    {nombre: 'Orden de hospitalización'},
    {nombre: 'Ninguna'}
  ]

  constructor(
    public dialogRef: MatDialogRef<HistoriaClinicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoriaClinicaData,
    private serviceHistoriaClinica: ServicioService
  ) {
    this.historia = data.historiaClinica;
    this.tipo = data.tipo;
    this.formHistoriaClinica = this.inicializarFormHistoria();
    this.formConsulta = this.inicializarFormConsulta();
    this.formUrgencias = this.inicializarFormUrgencias();
    this.formProcedimientos = this.inicializarFormProcedimientos();
    this.formHospitalizacion = this.inicializarFormHospitalizacion();

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 100, 11, 31)
   }

  ngOnInit(): void {
    this.listarPacientes();
    this.listarPersonalMedico();
  }

  inicializarFormHistoria(): FormGroup {
    return new FormGroup({
      idPersonalMedico: new FormControl(this.consulta?.idPersonalMedico, Validators.required),
      idPaciente: new FormControl(this.consulta?.idPaciente, Validators.required),
      tipoDeHistoriaClinica: new FormControl(this.consulta?.tipoDeHistoriaClinica, Validators.required),
    });
  }

  inicializarFormConsulta(): FormGroup {
    return new FormGroup({
      fechaDeConsulta: new FormControl(this.consulta?.fechaDeConsulta, Validators.required),
      horaDeConsulta: new FormControl(this.consulta?.horaDeConsulta, Validators.required),
      tipoDeConsulta: new FormControl(this.consulta?.tipoDeConsulta, Validators.required),
      causaExterna: new FormControl(this.consulta?.causaExterna, Validators.required),
      conducta: new FormControl(this.consulta?.conducta, Validators.required),
    });
  }

  inicializarFormUrgencias(): FormGroup{
    return new FormGroup({
      fechaDeIngreso: new FormControl(this.urgencias?.fechaDeIngreso, Validators.required),
      horaDeIngreso: new FormControl(this.urgencias?.horaDeIngreso, Validators.required),
      fechaDeSalida: new FormControl(this.urgencias?.fechaDeSalida),
      horaDeSalida: new FormControl(this.urgencias?.horaDeSalida),
      causaExterna: new FormControl(this.urgencias?.causaExterna, Validators.required),
      conducta: new FormControl(this.urgencias?.conducta, Validators.required),
      horasDeObservacion: new FormControl(this.urgencias?.horasDeObservacion),
    })
  }

  inicializarFormProcedimientos(): FormGroup{
    return new FormGroup({
      fechaDeProcedimiento: new FormControl(this.procedimientos?.fechaDeProcedimiento, Validators.required),
      claseDeProcedimiento: new FormControl(this.procedimientos?.claseDeProcedimiento, Validators.required),
      tipoDeProcedimiento: new FormControl(this.procedimientos?.tipoDeProcedimiento, Validators.required),
    })
  }

  inicializarFormHospitalizacion(): FormGroup{
    return new FormGroup({
      fechaDeEgreso: new FormControl(this.hospitalizacion?.fechaDeEgreso, Validators.required),
      horaDeEgreso: new FormControl(this.hospitalizacion?.horaDeEgreso, Validators.required),
      diasDeEstancia: new FormControl(this.hospitalizacion?.diasDeEstancia, Validators.required),
      estadoEgreso: new FormControl(this.hospitalizacion?.estadoEgreso, Validators.required),
    })
  }

  onNoClick(): void {
    this.dialogRef.close({ update: false });
  }

  enviarHistoriaClinica(): void {
    this.consulta = this.formConsulta.value;
    this.consulta.idPersonalMedico = this.formHistoriaClinica.get("idPersonalMedico")?.value;
    this.consulta.idPaciente = this.formHistoriaClinica.get("idPaciente")?.value;
    this.consulta.tipoDeHistoriaClinica = this.formHistoriaClinica.get("tipoDeHistoriaClinica")?.value;

    this.urgencias = this.formUrgencias.value;
    this.urgencias.idPersonalMedico = this.formHistoriaClinica.get("idPersonalMedico")?.value;
    this.urgencias.idPaciente = this.formHistoriaClinica.get("idPaciente")?.value;
    this.urgencias.tipoDeHistoriaClinica = this.formHistoriaClinica.get("tipoDeHistoriaClinica")?.value;

    this.procedimientos = this.formProcedimientos.value;
    this.procedimientos.idPersonalMedico = this.formHistoriaClinica.get("idPersonalMedico")?.value;
    this.procedimientos.idPaciente = this.formHistoriaClinica.get("idPaciente")?.value;
    this.procedimientos.tipoDeHistoriaClinica = "Procedimiento";

    this.hospitalizacion = this.formHospitalizacion.value;

    if (this.tipo === 'nuevo') {

      if (this.formConsulta.get("fechaDeConsulta")?.valid){
        this.serviceHistoriaClinica.enviarConsulta(this.consulta).subscribe(
          respuesta => {
            this.dialogRef.close({ data: this.data, update: true });
            console.log(respuesta);
          },
          error => {
            console.log("error");
          }
        );
      }

      if (this.formUrgencias.get("fechaDeIngreso")?.valid){
        this.serviceHistoriaClinica.enviarUrgencias(this.consulta).subscribe(
          respuesta => {
            if(this.formUrgencias.get("conducta")?.value === 'Orden de hospitalización'){
              this.hospitalizacion.idViaDeIngreso = respuesta.id;
              this.serviceHistoriaClinica.enviarHospitalizacion(this.hospitalizacion).subscribe(
                respuesta => {
                  console.log("respuesta")
                }, error => {
                  console.log("error");
                }
              )
            }
            this.dialogRef.close({ data: this.data, update: true });
            console.log(respuesta);
          },
          error => {
            console.log("error");
          }
        );
      }

      if (this.formProcedimientos.get("fechaDeProcedimiento")?.valid){
        this.serviceHistoriaClinica.enviarProcedimiento(this.consulta).subscribe(
          respuesta => {
            this.dialogRef.close({ data: this.data, update: true });
            console.log(respuesta);
          },
          error => {
            console.log("error");
          }
        );
      }
    }

    if (this.tipo === 'editar') {
      if (this.formConsulta.get("fechaDeConsulta")?.valid){
        this.serviceHistoriaClinica.enviarConsulta(this.consulta).subscribe(
          respuesta => {
            this.dialogRef.close({ data: this.data, update: true });
            console.log(respuesta);
          },
          error => {
            console.log("error");
          }
        );
      }

      if (this.formUrgencias.get("fechaDeIngreso")?.valid){
        this.serviceHistoriaClinica.enviarUrgencias(this.consulta).subscribe(
          respuesta => {
            if(this.formUrgencias.get("conducta")?.value === 'Orden de hospitalización'){
              this.hospitalizacion.idViaDeIngreso = respuesta.id;
              this.serviceHistoriaClinica.enviarHospitalizacion(this.hospitalizacion).subscribe(
                respuesta => {
                  console.log("respuesta")
                }, error => {
                  console.log("error");
                }
              )
            }
            this.dialogRef.close({ data: this.data, update: true });
            console.log(respuesta);
          },
          error => {
            console.log("error");
          }
        );
      }

      if (this.formProcedimientos.get("fechaDeProcedimiento")?.valid){
        this.serviceHistoriaClinica.enviarProcedimiento(this.consulta).subscribe(
          respuesta => {
            this.dialogRef.close({ data: this.data, update: true });
            console.log(respuesta);
          },
          error => {
            console.log("error");
          }
        );
      }
    }

  }

  get tipoDeHistoriaClinicaControl(): AbstractControl | null {
    return this.formHistoriaClinica?.get("tipoDeHistoriaClinica");
  }

  get conductaConsulta(): AbstractControl | null {
    return this.formConsulta?.get("conducta");
  }

  get conductaUrgencias(): AbstractControl | null {
    return this.formUrgencias?.get("conducta");
  }

  listarPacientes(){
    this.serviceHistoriaClinica.listarPaciente().subscribe(respuesta => {
      this.pacientes = respuesta
    }, error => {
      console.log("error");
    })
  }

  listarPersonalMedico(){
    this.serviceHistoriaClinica.listarPersonalMedico().subscribe(respuesta => {
      this.personalMedico = respuesta
    }, error => {
      console.log("error");
    })
  }

}


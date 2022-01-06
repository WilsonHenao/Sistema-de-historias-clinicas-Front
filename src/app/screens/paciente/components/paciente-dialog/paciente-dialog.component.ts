import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactoDeEmergencia } from 'src/app/model/ContactoDeEmergencia';
import { Paciente } from 'src/app/model/Paciente';
import { ServicioService } from 'src/app/services/servicio.service';

type PacienteData = {
  paciente: Paciente;
  tipo: 'nuevo' | 'editar'
}

@Component({
  selector: 'app-paciente-dialog',
  templateUrl: './paciente-dialog.component.html',
  styleUrls: ['./paciente-dialog.component.css']
})
export class PacienteDialogComponent implements OnInit {

  public paciente: Paciente = new Paciente();
  public contacto: ContactoDeEmergencia = new ContactoDeEmergencia();
  public formPaciente: FormGroup;
  public formContacto: FormGroup;
  public tipo: 'nuevo' | 'editar';

  public minDate: Date | undefined;
  public maxDate: Date | undefined;

  constructor(
    public dialogRef: MatDialogRef<PacienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PacienteData,
    private servicePaciente: ServicioService
  ) { 
    this.paciente = data.paciente;
    this.tipo = data.tipo;
    this.formPaciente = this.inicializarFormPaciente();
    this.formContacto = this.inicializarFormContacto();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 100, 11, 31)
  }

  ngOnInit(): void {
  }

  inicializarFormPaciente(): FormGroup {
    return new FormGroup({
      nombre: new FormControl(this.paciente?.nombre, Validators.required),
      apellido: new FormControl(this.paciente?.apellido, Validators.required),
      estadoCivil: new FormControl(this.paciente?.estadoCivil, Validators.required),
      documentoDeIdentidad: new FormControl(this.paciente?.documentoDeIdentidad, Validators.required),
      fechaDeNacimiento: new FormControl(this.paciente?.fechaDeNacimiento, Validators.required),
      edad: new FormControl(this.paciente?.edad, Validators.required),
      sexo: new FormControl(this.paciente?.sexo, Validators.required),
      ocupacion: new FormControl(this.paciente?.ocupacion, Validators.required),
      direccion: new FormControl(this.paciente?.direccion, Validators.required),
      telefonoDelDomicilio: new FormControl(this.paciente?.telefonoDelDomicilio, Validators.required),
      lugarDeResidencia: new FormControl(this.paciente?.lugarDeResidencia, Validators.required),
      estado: new FormControl(this.paciente?.estado)
    });
  }

  inicializarFormContacto(): FormGroup{
    return new FormGroup({
      nombre: new FormControl(this.contacto?.nombre, Validators.required),
      apellido: new FormControl(this.contacto?.apellido, Validators.required),
      telefono: new FormControl(this.contacto?.telefono, Validators.required),
      parentescoConPaciente: new FormControl(this.contacto?.parentescoConPaciente, Validators.required)
    })
  }

  onNoClick(): void {
    this.dialogRef.close({ update: false });
  }

  enviarPaciente(): void {
    this.contacto = this.formContacto.value;
    
    this.paciente.apellido = this.formPaciente.get("apellido")?.value;
    this.paciente.direccion = this.formPaciente.get("direccion")?.value;
    this.paciente.documentoDeIdentidad = this.formPaciente.get("documentoDeIdentidad")?.value;
    this.paciente.edad = this.formPaciente.get("edad")?.value;
    this.paciente.estado = this.formPaciente.get("estado")?.value;
    this.paciente.estadoCivil = this.formPaciente.get("estadoCivil")?.value;
    this.paciente.fechaDeNacimiento = this.formPaciente.get("fechaDeNacimiento")?.value;
    this.paciente.lugarDeResidencia = this.formPaciente.get("lugarDeResidencia")?.value;
    this.paciente.nombre = this.formPaciente.get("nombre")?.value;
    this.paciente.ocupacion = this.formPaciente.get("ocupacion")?.value;
    this.paciente.sexo = this.formPaciente.get("sexo")?.value;
    this.paciente.telefonoDelDomicilio = this.formPaciente.get("telefonoDelDomicilio")?.value;

    if (this.tipo === 'nuevo') {
      this.servicePaciente.enviarContacto(this.contacto).subscribe(
        respuesta => {
          this.dialogRef.close({data: this.data, update: true});
          this.paciente.idContactoDeEmergencia = respuesta.id;
          this.servicePaciente.enviarPaciente(this.paciente).subscribe(
            respuesta => {
              this.dialogRef.close({ data: this.data, update: true });
              console.log(respuesta);
            },
            error => {
              console.log("error");
            }
          );
        }
      )
    }

    if (this.tipo === 'editar') {
      this.servicePaciente.actualizarContacto(this.contacto).subscribe(
        respuesta => {
          this.dialogRef.close({ data: this.data, update: true });
        },
        error => {
          console.log("error");
        }
      )
      this.servicePaciente.actualizarPaciente(this.paciente).subscribe(
        respuesta => {
          this.dialogRef.close({ data: this.data, update: true });
          console.log(respuesta);
        },
        error => {
          console.log("error");
        }
      )
    }

  }

}

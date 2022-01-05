import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntidadDeSalud } from 'src/app/model/EntidadDeSalud';
import { PersonalMedico } from 'src/app/model/PersonalMedico';
import { ServicioService } from 'src/app/services/servicio.service';

type PersonalData = {
  personal: PersonalMedico;
  tipo: 'nuevo' | 'editar'
}

@Component({
  selector: 'app-personal-medico-dialog',
  templateUrl: './personal-medico-dialog.component.html',
  styleUrls: ['./personal-medico-dialog.component.css']
})
export class PersonalMedicoDialogComponent implements OnInit {

  public personal: PersonalMedico = new PersonalMedico();
  public formPersonal: FormGroup;
  public tipo: 'nuevo' | 'editar';
  public entidades: EntidadDeSalud[] = new Array<EntidadDeSalud>();

  constructor(
    public dialogRef: MatDialogRef<PersonalMedicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonalData,
    private servicePersonal: ServicioService
  ) {
    this.personal = data.personal;
    this.tipo = data.tipo;
    this.formPersonal = this.inicializarFormPersonal();
   }

  ngOnInit(): void {
  }

  inicializarFormPersonal(): FormGroup {
    return new FormGroup({
      nombre: new FormControl(this.personal?.nombre, Validators.required),
      apellidos: new FormControl(this.personal?.apellido, Validators.required),
      especialidad: new FormControl(this.personal?.especialidad, Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarPersonal(): void {
    this.personal.nombre = this.formPersonal.get("nombre")?.value;
    this.personal.apellido = this.formPersonal.get("apellidos")?.value;
    this.personal.especialidad = this.formPersonal.get("especialidad")?.value;

    if (this.tipo === 'nuevo') {
      this.dialogRef.close(this.data);
      this.servicePersonal.enviarPersonalMedico(this.personal).subscribe(
        respuesta => {
          console.log(respuesta);
        },
        error => {
          console.log("error");
        }
      );
    }

    if (this.tipo === 'editar') {
      this.dialogRef.close(this.data);
      this.servicePersonal.actualizarPersonalMedico(this.personal).subscribe(
        respuesta => {
          console.log(respuesta);
        },
        error => {
          console.log("error");
        }
      )
    }

  }

  listarEntidadDeSalud() {
    this.servicePersonal.listarEntidad().subscribe(respuesta => {
      this.entidades = respuesta;
      console.log(respuesta);
    }, error => {
      console.log("error");
    });
  }

}

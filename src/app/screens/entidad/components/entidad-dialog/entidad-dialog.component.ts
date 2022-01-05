import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntidadDeSalud } from 'src/app/model/EntidadDeSalud';
import { ServicioService } from 'src/app/services/servicio.service';

type EntidadData = {
  entidad: EntidadDeSalud;
  tipo: 'nuevo' | 'editar'
}

@Component({
  selector: 'app-entidad-dialog',
  templateUrl: './entidad-dialog.component.html',
  styleUrls: ['./entidad-dialog.component.css']
})

export class EntidadDialogComponent implements OnInit {
  public entidad: EntidadDeSalud = new EntidadDeSalud();
  public formEntidad: FormGroup;
  public tipo: 'nuevo' | 'editar';

  constructor(
    public dialogRef: MatDialogRef<EntidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntidadData,
    private serviceEntidad: ServicioService
  ) {
    this.entidad = data.entidad;
    this.tipo = data.tipo;
    this.formEntidad = this.inicializarFormEntidad();
  }

  ngOnInit(): void {
  }

  inicializarFormEntidad(): FormGroup {
    return new FormGroup({
      nombre: new FormControl(this.entidad?.nombre, Validators.required),
      direccion: new FormControl(this.entidad?.direccion, Validators.required),
      telefono: new FormControl(this.entidad?.telefono, Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarEntidad(): void {
    this.entidad.nombre = this.formEntidad.get("nombre")?.value;
    this.entidad.direccion = this.formEntidad.get("direccion")?.value;
    this.entidad.telefono = this.formEntidad.get("telefono")?.value;

    if (this.tipo === 'nuevo') {
      this.dialogRef.close(this.data);
      this.serviceEntidad.enviarEntidad(this.entidad).subscribe(
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
      this.serviceEntidad.actualizarEntidad(this.entidad).subscribe(
        respuesta => {
          console.log(respuesta);
        },
        error => {
          console.log("error");
        }
      )
    }

  }

}

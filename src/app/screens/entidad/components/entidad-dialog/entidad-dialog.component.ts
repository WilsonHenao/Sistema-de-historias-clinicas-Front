import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EntidadDeSalud } from 'src/app/model/EntidadDeSalud';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-entidad-dialog',
  templateUrl: './entidad-dialog.component.html',
  styleUrls: ['./entidad-dialog.component.css']
})
export class EntidadDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EntidadDialogComponent>, 
    private serviceEntidad: ServicioService) { }

  public entidad: EntidadDeSalud = new EntidadDeSalud();

  formEntidad = new FormGroup({
    nombre: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close()
  }

  enviarEntidad(): void{
    this.entidad.nombre = this.formEntidad.get("nombre")?.value;
    this.entidad.direccion = this.formEntidad.get("direccion")?.value;
    this.entidad.telefono = this.formEntidad.get("telefono")?.value;

    this.serviceEntidad.enviarEntidad(this.entidad).subscribe(respuesta => {
      console.log(respuesta);
    },
    error => {
      console.log("error");
    })
  }

}

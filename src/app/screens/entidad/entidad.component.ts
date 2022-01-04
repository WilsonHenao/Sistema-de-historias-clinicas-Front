import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { EntidadDeSalud } from 'src/app/model/EntidadDeSalud';
import { ServicioService } from 'src/app/services/servicio.service';
import { EntidadDialogComponent } from './components/entidad-dialog/entidad-dialog.component';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {

  constructor(public dialog: MatDialog, private serviceEntidad: ServicioService) { }

  openNew(){
    const dialogRef = this.dialog.open(EntidadDialogComponent,{
      width: '450px'
    })
  }

  public entidad: EntidadDeSalud[] = new Array<EntidadDeSalud>();
  public entidadDeSalud: EntidadDeSalud = new EntidadDeSalud();

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
    this.listarEntidadDeSalud();
  }

  listarEntidadDeSalud(){
    this.serviceEntidad.listarEntidad().subscribe(respuesta => {
      this.entidad = respuesta;
      console.log(respuesta);
    },error => {
      console.log("error");
    });
  }

  

}

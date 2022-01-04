import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { EntidadDeSalud } from 'src/app/model/EntidadDeSalud';
import { ServicioService } from 'src/app/services/servicio.service';
import { EntidadDialogComponent } from './components/entidad-dialog/entidad-dialog.component';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class EntidadComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private serviceEntidad: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  openNew() {
    const dialogRef = this.dialog.open(EntidadDialogComponent, {
      width: '450px',
      data: { entidad: {}, tipo: 'nuevo' }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.entidad.push(result);
      this.listarEntidadDeSalud();
      this.messageService.add({
        severity: 'success',
        detail: 'Entidad creada',
        life: 3000
      });
    })
  }

  editarEntidad(entidadDeSalud: EntidadDeSalud) {
    const dialogRef = this.dialog.open(EntidadDialogComponent, {
      width: '450px',
      data: { entidad: entidadDeSalud, tipo: 'editar' }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.messageService.add({
        severity: 'success',
        detail: 'Entidad actualizada',
        life: 3000
      });
    })
  }

  public entidad: EntidadDeSalud[] = new Array<EntidadDeSalud>();

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
    this.listarEntidadDeSalud();
  }

  listarEntidadDeSalud() {
    this.serviceEntidad.listarEntidad().subscribe(respuesta => {
      this.entidad = respuesta;
      console.log(respuesta);
    }, error => {
      console.log("error");
    });
  }

  eliminarEntidad(entidad: EntidadDeSalud) {
    this.confirmationService.confirm({
      message: '¿Está seguro de querer eliminar ' + entidad.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      accept: () => {
        this.serviceEntidad.eliminarEntidad(entidad.id).subscribe(respuesta => {
          console.log(respuesta);
          this.listarEntidadDeSalud();
        }, error => {
          console.log(error);
        })
        this.messageService.add({
          severity: 'success',
          detail: 'Entidad eliminada',
          life: 3000
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Consulta } from 'src/app/model/Consulta';
import { HistoriaClinica } from 'src/app/model/HistoriaClinica';
import { ServicioService } from 'src/app/services/servicio.service';
import { HistoriaClinicaDialogComponent } from './components/historia-clinica-dialog/historia-clinica-dialog.component';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HistoriaClinicaComponent implements OnInit {

  public historiaClinica: Consulta[] = new Array<Consulta>();

  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private serviceHistoriaClinica: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  openNew() {
    const dialogRef = this.dialog.open(HistoriaClinicaDialogComponent, {
      width: '80%',
      data: { historia: new HistoriaClinica(), tipo: 'nuevo' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.update) {
        this.historiaClinica.push(result);
        this.listarHistoriasClinicas();
        this.messageService.add({
        severity: 'success',
        detail: 'Historia Clinica creada',
        life: 3000
        });
      }
    })
  }

  editarHistoriaClinica(historiaClinica: HistoriaClinica) {
    const dialogRef = this.dialog.open(HistoriaClinicaDialogComponent, {
      width: '80%',
      data: { historia: historiaClinica, tipo: 'editar' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.uptadte){
        this.messageService.add({
        severity: 'success',
        detail: 'Historia clínica actualizada',
        life: 3000
        });
      }
    })
  }

  ngOnInit(): void {
    this.loading = false;
    this.listarHistoriasClinicas();
  }

  listarHistoriasClinicas() {
    this.serviceHistoriaClinica.listarConsulta().subscribe(respuesta => {
      this.historiaClinica = respuesta;
    }, error => {
      console.log("error");
    });
  }

  eliminarHistoriaClinica(historia: HistoriaClinica) {
    this.confirmationService.confirm({
      message: '¿Está seguro de querer eliminar ' + historia.idTipoDeHistoriaClinica + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      accept: () => {
        this.serviceHistoriaClinica.eliminarPaciente(historia.id).subscribe(respuesta => {
          console.log(respuesta);
          this.listarHistoriasClinicas();
        }, error => {
          console.log(error);
        })
        this.messageService.add({
          severity: 'success',
          detail: 'Historia clínica eliminada',
          life: 3000
        });
      }
    });
  }

}

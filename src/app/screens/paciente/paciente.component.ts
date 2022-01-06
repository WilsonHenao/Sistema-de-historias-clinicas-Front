import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paciente } from 'src/app/model/Paciente';
import { Pacientes } from 'src/app/model/Pacientes';
import { ServicioService } from 'src/app/services/servicio.service';
import { PacienteDialogComponent } from './components/paciente-dialog/paciente-dialog.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PacienteComponent implements OnInit {

  public paciente: Paciente[] = new Array<Paciente>();
  public pacientes: Pacientes[] = new Array<Pacientes>();

  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private servicePaciente: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  openNew() {
    const dialogRef = this.dialog.open(PacienteDialogComponent, {
      width: '80%',
      data: { paciente: new Paciente(), tipo: 'nuevo' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.update) {
        this.paciente.push(result);
        this.listarPacientes();
        this.messageService.add({
        severity: 'success',
        detail: 'Paciente creado',
        life: 3000
        });
      }
    })
  }

  editarPaciente(paciente: Paciente) {
    const dialogRef = this.dialog.open(PacienteDialogComponent, {
      width: '80%',
      data: { paciente: paciente, tipo: 'editar' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.update){
        this.messageService.add({
        severity: 'success',
        detail: 'Paciente actualizado',
        life: 3000
        });
      }
    })
  }

  ngOnInit(): void {
    this.loading = false;
    this.listarPacientes();
  }

  listarPacientes() {
    this.servicePaciente.listarPaciente().subscribe(respuesta => {
      this.pacientes = respuesta;
      this.servicePaciente.listarContacto().subscribe(respuesta => {
        const contactos = respuesta;
        this.pacientes = this.pacientes.map(p => {
          const contacto = contactos.find(c => c.id === p.idContactoDeEmergencia);
          p.nombreContacto = contacto?.nombre;
          p.telefonoContacto = contacto?.telefono;
          return p;
        })
      })
    }, error => {
      console.log("error");
    });
  }

  eliminarPaciente(paciente: Paciente) {
    this.confirmationService.confirm({
      message: '¿Está seguro de querer eliminar ' + paciente.nombre + paciente.apellido + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      accept: () => {
        this.servicePaciente.eliminarPaciente(paciente.id).subscribe(respuesta => {
          console.log(respuesta);
          this.servicePaciente.eliminarContacto(paciente.idContactoDeEmergencia).subscribe(respuesta => {
            console.log(respuesta);
          })
          this.listarPacientes();
        }, error => {
          console.log(error);
        })
        this.messageService.add({
          severity: 'success',
          detail: 'Paciente eliminado',
          life: 3000
        });
      }
    });
  }

}

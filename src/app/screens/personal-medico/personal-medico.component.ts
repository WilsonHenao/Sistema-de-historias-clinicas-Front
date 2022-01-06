import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PersonalMedico } from 'src/app/model/PersonalMedico';
import { ServicioService } from 'src/app/services/servicio.service';
import { PersonalMedicoDialogComponent } from './components/personal-medico-dialog/personal-medico-dialog.component';

@Component({
  selector: 'app-personal-medico',
  templateUrl: './personal-medico.component.html',
  styleUrls: ['./personal-medico.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PersonalMedicoComponent implements OnInit {

  public personal: PersonalMedico[] = new Array<PersonalMedico>();

  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private servicePersonalMedico: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  openNew() {
    const dialogRef = this.dialog.open(PersonalMedicoDialogComponent, {
      width: '450px',
      data: { personal: new PersonalMedico(), tipo: 'nuevo' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.update) {
        this.personal.push(result);
        this.listarPersonalMedico();
        this.messageService.add({
        severity: 'success',
        detail: 'Personal médico creado',
        life: 3000
        });
      }
    })
  }

  editarPersonalMedico(personalMedico: PersonalMedico) {
    const dialogRef = this.dialog.open(PersonalMedicoDialogComponent, {
      width: '450px',
      data: { personal: personalMedico, tipo: 'editar' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.update){
        this.messageService.add({
        severity: 'success',
        detail: 'Personal médico actualizado',
        life: 3000
        });
      }
    })
  }

  ngOnInit(): void {
    this.loading = false;
    this.listarPersonalMedico();
  }

  listarPersonalMedico() {
    this.servicePersonalMedico.listarPersonalMedico().subscribe(respuesta => {
      this.personal = respuesta;
      this.servicePersonalMedico.listarEntidad().subscribe(success => {
        const entidades = success;
        this.personal = this.personal.map(p => {
          const entidad = entidades.find(e => e.id === p.idEntidadDeSalud);
          p.entidadDeSalud = entidad?.nombre;
          return p;
        });
      });
    }, error => {
      console.log("error");
    });
  }

  eliminarPersonalMedico(personal: PersonalMedico) {
    this.confirmationService.confirm({
      message: '¿Está seguro de querer eliminar ' + personal.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      accept: () => {
        this.servicePersonalMedico.eliminarPersonalMedico(personal.id).subscribe(respuesta => {
          console.log(respuesta);
          this.listarPersonalMedico();
        }, error => {
          console.log(error);
        })
        this.messageService.add({
          severity: 'success',
          detail: 'Personal médico eliminado',
          life: 3000
        });
      }
    });
  }
}

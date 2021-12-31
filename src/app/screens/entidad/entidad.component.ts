import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EntidadDeSalud } from 'src/app/model/EntidadDeSalud';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {

  constructor() { }

  public entidad: EntidadDeSalud[] = new Array<EntidadDeSalud>();

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
  }

  clear(table: Table){
    table.clear();
  }

}

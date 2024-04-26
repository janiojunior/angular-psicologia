import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { PacienteService } from '../../../services/paciente.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.css'
})
export class PacienteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cpf', 'nome', 'username', 'municipio', 'acao'];
  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService) {

  }

  ngOnInit(): void {
    this.pacienteService.findAll().subscribe(data => {
      this.pacientes = data;
    })
  }

}

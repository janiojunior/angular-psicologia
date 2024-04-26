import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Municipio } from '../../../models/municipio.model';
import { Paciente } from '../../../models/paciente.model';
import { MunicipioService } from '../../../services/municipio.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent implements OnInit {

  formGroup: FormGroup;
  municipios: Municipio[] = [];

  constructor(private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private municipioService: MunicipioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      username: ['', null],
      senha: ['', null],
      naturalidade: [null]
    });
  }
  ngOnInit(): void {
    this.municipioService.findAll().subscribe(data => {
      this.municipios = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const paciente: Paciente = this.activatedRoute.snapshot.data['paciente'];

    // selecionando o municipio
    const municipio = this.municipios
      .find(municipio => municipio.id === (paciente?.naturalidade?.id || null)); 

    this.formGroup = this.formBuilder.group({
      id: [(paciente && paciente.id) ? paciente.id : null],
      cpf: [(paciente && paciente.cpf) ? paciente.cpf : '', Validators.required],
      nome: [(paciente && paciente.nome) ? paciente.nome : '', Validators.required],
      username: [(paciente && paciente.username) ? paciente.username : '', null],
      senha: [(paciente && paciente.senha) ? paciente.senha : '', null],
      naturalidade: [municipio]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const paciente = this.formGroup.value;
      if (paciente.id ==null) {
        this.pacienteService.insert(paciente).subscribe({
          next: (pacienteCadastrado) => {
            this.router.navigateByUrl('/pacientes');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.pacienteService.update(paciente).subscribe({
          next: (pacienteAlterado) => {
            this.router.navigateByUrl('/pacientes');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const paciente = this.formGroup.value;
      if (paciente.id != null) {
        this.pacienteService.delete(paciente).subscribe({
          next: () => {
            this.router.navigateByUrl('/pacientes');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstadoService } from '../../../services/estado.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-estado-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})
export class EstadoFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private estadoService: EstadoService,
              private router: Router) {

    this.formGroup = formBuilder.group({
      nome: ['', Validators.required],
      sigla: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoEstado = this.formGroup.value;
      this.estadoService.salvar(novoEstado).subscribe({
        next: (estadoCadastrado) => {
          this.router.navigateByUrl('/estados');
        },
        error: (err) => {
          console.log('Erro ao salvar' + JSON.stringify(err));
        }
      });
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Consulta } from '../../../models/consulta.model';
import { ConsultaService } from '../../../services/consulta.service';
import { Location, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.css'
})
export class ConsultaFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;
  
  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
              private consultaService: ConsultaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {

    const consulta: Consulta = activatedRoute.snapshot.data['consulta'];

    this.formGroup = formBuilder.group({
      id: [(consulta && consulta.id) ? consulta.id : null],
      nome: [(consulta && consulta.nome) ? consulta.nome : '', 
            Validators.compose([Validators.required])],
      preco:[(consulta && consulta.preco) ? consulta.preco : '', Validators.required]
    });

  }

  voltarPagina() {
    this.location.back();
  }

  salvar() {
    if (this.formGroup.valid) {
      const consulta = this.formGroup.value;
      if (consulta.id == null) {
        this.consultaService.save(consulta).subscribe({
          next: (consultaCadastrada) => {
            this.uploadImage(consultaCadastrada.id);
          },
          error: (errorResponse) => {
             // Processar erros da API
            this.apiResponse = errorResponse.error; 

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });
      
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.consultaService.update(consulta).subscribe({
          next: (consultaAtualizada) => {
            this.uploadImage(consultaAtualizada.id);
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });        
      }
    }
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }

  excluir() {
    const consulta = this.formGroup.value;
    if (consulta.id != null) {
      this.consultaService.delete(consulta).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/consultas/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }      
  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(consultaId: number) {
    if (this.selectedFile) {
      this.consultaService.uploadImagem(consultaId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.voltarPagina();
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      })
    } else {
      this.voltarPagina();
    }
  }
}

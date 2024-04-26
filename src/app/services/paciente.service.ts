import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private baseUrl = 'http://localhost:8080/pacientes';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.baseUrl);
  }

  findById(id: string): Observable<Paciente> {
    return this.httpClient.get<Paciente>(`${this.baseUrl}/${id}`);
  }

  insert(paciente: Paciente): Observable<Paciente> {
    console.log(paciente);
    const data = {
      cpf: paciente.cpf,
      nome: paciente.nome,
      username: paciente.username,
      senha: paciente.senha,
      idNaturalidade: paciente.naturalidade.id
    }
    return this.httpClient.post<Paciente>(this.baseUrl, data);
  }
  
  update(paciente: Paciente): Observable<Paciente> {
    const data = {
      cpf: paciente.cpf,
      nome: paciente.nome,
      username: paciente.username,
      senha: paciente.senha,
      idNaturalidade: paciente.naturalidade.id
    }
    return this.httpClient.put<Paciente>(`${this.baseUrl}/${paciente.id}`, data);
  }

  delete(paciente: Paciente): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${paciente.id}`);
  }

}

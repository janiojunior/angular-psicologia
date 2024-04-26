import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { estadoResolver } from './components/estado/resolver/estado-resolver';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { municipioResolver } from './components/municipio/resolver/municipio-resolver';
import { PacienteListComponent } from './components/paciente/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './components/paciente/paciente-form/paciente-form.component';
import { pacienteResolver } from './components/paciente/resolver/paciente-resolver';

export const routes: Routes = [
    { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
    { path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},

    { path: 'municipios', component: MunicipioListComponent, title: 'Lista de Municipios'},
    { path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo Municipio'},
    { path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: {municipio: municipioResolver}},

    { path: 'pacientes', component: PacienteListComponent, title: 'Lista de Pacientes'},
    { path: 'pacientes/new', component: PacienteFormComponent, title: 'Novo Paciente'},
    { path: 'pacientes/edit/:id', component: PacienteFormComponent, resolve: {paciente: pacienteResolver}},
];

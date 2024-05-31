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
import { LoginComponent } from './components/login/login.component';
import { ConsultaCardListComponent } from './components/consulta-card-list/consulta-card-list.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { ConsultaFormComponent } from './components/consulta/consulta-form/consulta-form.component';
import { ConsultaListComponent } from './components/consulta/consulta-list/consulta-list.component';
import { consultaResolver } from './components/consulta/resolver/consulta-resolver';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        component: UserTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'produtos'},

            { path: 'produtos', component: ConsultaCardListComponent, title: 'Produtos à Venda' },
            { path: 'login', component: LoginComponent, title: 'Login'},
            { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos'},
        ]

    },
    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'estados'},
        
            { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
            { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado', canActivate: [authGuard]},
            { path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},
        
            { path: 'municipios', component: MunicipioListComponent, title: 'Lista de Municipios'},
            { path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo Municipio'},
            { path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: {municipio: municipioResolver}},
        
            { path: 'pacientes', component: PacienteListComponent, title: 'Lista de Pacientes'},
            { path: 'pacientes/new', component: PacienteFormComponent, title: 'Novo Paciente'},
            { path: 'pacientes/edit/:id', component: PacienteFormComponent, resolve: {paciente: pacienteResolver}},

            { path: 'consultas', component: ConsultaListComponent, title: 'Lista de Consultas'},
            { path: 'consultas/new', component: ConsultaFormComponent, title: 'Nova Consulta'},
            { path: 'consultas/edit/:id', component: ConsultaFormComponent, resolve: {consulta: consultaResolver}},
        ]

    },
    
];

import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Paciente } from "../../../models/paciente.model";
import { PacienteService } from "../../../services/paciente.service";
import { inject } from "@angular/core";

export const pacienteResolver: ResolveFn<Paciente> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PacienteService).findById(route.paramMap.get('id')!);
    }
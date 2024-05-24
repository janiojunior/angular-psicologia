import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Consulta } from "../../../models/consulta.model";
import { ConsultaService } from "../../../services/consulta.service";
import { inject } from "@angular/core";

export const consultaResolver: ResolveFn<Consulta> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ConsultaService).findById(route.paramMap.get('id')!);
    }
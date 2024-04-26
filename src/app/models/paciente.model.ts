import { Municipio } from "./municipio.model";

export class Paciente {
    id!: number;
    cpf!: string;
    nome!: string;
    username!: string;
    senha!: string;
    naturalidade!: Municipio;
}

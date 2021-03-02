import { Funcionalidade } from "./funcionalidade.model";

export class Modulo {

    id: number = 0;
    nome: string = '';
    descricao: string = '';
    imagem: string = '';
    ordem: number = 99;
    funcionalidades: Funcionalidade[] = [];
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
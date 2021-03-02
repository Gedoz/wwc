export class Funcionalidade {

    id: number = 0;
    idModulo: number = 0;
    descricao: string = '';
    ordem: number = 99;
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
export class Usuario {

    id: number = 0;
    email: string = '';
    senha: string = '';
    nome: string = '';
    solicitaAlteracao: string = '';
    codigoRecuperacao: string = '';
    situacao: string = 'A';
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
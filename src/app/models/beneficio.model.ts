export class Beneficio {

    id: number;
    nome: string = '';
    descricao: string = '';
    imagem: string = '';
    ordem: number = 99;
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
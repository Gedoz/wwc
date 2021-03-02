export class Cliente {

    id: number = 0;
    nome: string = '';
    link: string = '';
    imagem: string = '';
    ordem: number = 99;
    [x: string]: any;
    constructor() {
        Object.assign(this);
    }
}
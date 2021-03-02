export class Depoimento {

    id: number = 0;
    imagem: string = ''; 
    nome: string = ''; 
    descricao: string = ''; 
    depoimento: string = ''; 
    ordem: number = 99;
    [x: string]: any;
    constructor() {
        Object.assign(this);
    }
}
export class Consultoria {
    
    id: number = 0;
    titulo: string = '';
    descricao: string = '';
    ordem: number = 99;
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
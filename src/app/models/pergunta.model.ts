export class Pergunta {
    
    id: number = 0;
    pergunta: string = '';
    resposta: string = '';
    ordem = 99;
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
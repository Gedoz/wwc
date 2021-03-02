export class ContatoMensagem {
    
    id: number = 0;
    nome: string = '';
    email: string = '';
    telefone: string = '';
    assunto: string = '';
    mensagem: string = '';
    [x: string]: any;

    constructor() {
        Object.assign(this);
    }
}
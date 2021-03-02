export class Banner {
    
    id: number = 0;
    titulo: string = '';
    descricao: string = '';
    link: string = '';
    imagem: string = '';
    [x: string]: any;
    
    constructor() {
        Object.assign(this);
    }
}
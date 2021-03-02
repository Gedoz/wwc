export class ConfiguracaoGeral {
    
    id: number = 0;
    ambiente: string = '';
    imagemLogo: string = '';
    linkApi: string = '';
    caminhoFisico: string = '';
    [x: string]: any;
    constructor() {
        Object.assign(this);
    }
}
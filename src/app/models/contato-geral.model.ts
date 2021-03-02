export class ContatoGeral {

    id: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    whatsApp: string = '';
    telefone: string = '';
    email: string = '';
    linkFacebook: string = '';
    linkInstagram: string = '';
    linkLinkedin: string = '';
    uf: string = '';
    cidade: string = '';
    rua: string = '';
    numeroEndereco: string = '';
    bairro: string = '';
    cep: string = '';
    complemento: string = '';
    
    constructor() {
        Object.assign(this);
    }

}
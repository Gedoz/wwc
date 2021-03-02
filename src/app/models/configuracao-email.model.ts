export class ConfiguracaoEmail {

    id: number = 0;
    smtp: string = '';
    portaSmtp: number;
    ssl: string = '';
    emailAutenticar: string = '';
    senhaAutenticar: string = '';
    [x: string]: any;
    constructor() {
        Object.assign(this);
    }
}
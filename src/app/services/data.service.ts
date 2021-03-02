import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from '../models/banner.model';
import { Beneficio } from '../models/beneficio.model';
import { Cliente } from '../models/cliente.model';
import { Consultoria } from '../models/consultoria.model';
import { ContatoGeral } from '../models/contato-geral.model';
import { ContatoMensagem } from '../models/contato-mensagem.model';
import { Modulo } from '../models/modulo.model';
import { Pergunta } from '../models/pergunta.model';
import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public api: ApiService,
    public global: GlobalService
  ) { }

  getBanner(): Observable<Banner[]> {
    return this.api.get(`/site/banner/buscar`);
  }

  getContatoGeral(): Observable<ContatoGeral> {
    return this.api.get(`/site/contatoGeral/buscar`)
  }

  getBeneficios(numeroPagina: number, registroPorPagina: number): Observable<Beneficio[]> {
    return this.api.get(`/site/beneficio/buscar?numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}`);
  }

  getConsultorias(numeroPagina: number, registroPorPagina: number): Observable<Consultoria[]> {
    return this.api.get(`/site/consultoria/buscar?numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}`);
  }

  getDepoimentos(numeroPagina: number, registroPorPagina: number): Observable<Consultoria[]> {
    return this.api.get(`/site/depoimento/buscar?numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}`);
  }

  getClientes(numeroPagina: number, registroPorPagina: number): Observable<Cliente[]> {
    return this.api.get(`/site/cliente/buscar?numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}`)
  }

  getModulos(numeroPagina: number, registroPorPagina: number): Observable<Modulo[]> {
    return this.api.get(`/site/modulo/buscar?numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}`)
  }

  getPerguntas(numeroPagina: number, registroPorPagina: number): Observable<Pergunta[]> {
    return this.api.get(`/site/pergunta/buscar?numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}`)
  }

  inserirContatoMensagem(mensagem: ContatoMensagem): Observable<any> {
    return this.api.post(`/site/contatoMensagem/inserir`, mensagem);
  }
}

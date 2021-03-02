import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pergunta } from 'src/app/models/pergunta.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<PerguntasApi> {
    return this.api.get(`/pergunta/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/pergunta/buscar?id=${id}`);
  }

  post(pergunta: Pergunta): Observable<any> {
    return this.api.post('/pergunta/inserir', pergunta);
  }

  patch(pergunta: Pergunta): Observable<any> {
    return this.api.post('/pergunta/alterar', pergunta);
  }

  delete(pergunta: Pergunta): Observable<any> {
    return this.api.post('/pergunta/deletar', pergunta);
  }

  deleteSelected(perguntas: Pergunta[]): Observable<any> {
    return this.api.post('/pergunta/deletarLista', perguntas);
  }

}

export interface PerguntasApi {
  perguntas: Pergunta[];
  numeroPaginas: number;
}

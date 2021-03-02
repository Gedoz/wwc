import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depoimento } from 'src/app/models/depoimento.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DepoimentoService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<DepoimentosApi> {
    return this.api.get(`/depoimento/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/depoimento/buscar?id=${id}`);
  }

  post(depoimento: Depoimento): Observable<any> {
    return this.api.post('/depoimento/inserir', depoimento);
  }

  patch(depoimento: Depoimento): Observable<any> {
    return this.api.post('/depoimento/alterar', depoimento);
  }

  delete(depoimento: Depoimento): Observable<any> {
    return this.api.post('/depoimento/deletar', depoimento);
  }

  deleteSelected(depoimentos: Depoimento[]): Observable<any> {
    return this.api.post('/depoimento/deletarLista', depoimentos);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }

}

export interface DepoimentosApi {
  depoimentos: Depoimento[];
  numeroPaginas: number;
}

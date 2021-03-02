import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modulo } from 'src/app/models/modulo.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<ModulosApi> {
    return this.api.get(`/modulo/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/modulo/buscar?id=${id}`);
  }

  post(modulo: Modulo): Observable<any> {
    return this.api.post('/modulo/inserir', modulo);
  }

  patch(modulo: Modulo): Observable<any> {
    return this.api.post('/modulo/alterar', modulo);
  }

  delete(modulo: Modulo): Observable<any> {
    return this.api.post('/modulo/deletar', modulo);
  }

  deleteSelected(modulos: Modulo[]): Observable<any> {
    return this.api.post('/modulo/deletarLista', modulos);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }

}

export interface ModulosApi {
  modulos: Modulo[];
  numeroPaginas: number;
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultoria } from 'src/app/models/consultoria.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultoriaService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<ConsultoriasApi> {
    return this.api.get(`/consultoria/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/consultoria/buscar?id=${id}`);
  }

  post(consultoria: Consultoria): Observable<any> {
    return this.api.post('/consultoria/inserir', consultoria);
  }

  patch(consultoria: Consultoria): Observable<any> {
    return this.api.post('/consultoria/alterar', consultoria);
  }

  delete(consultoria: Consultoria): Observable<any> {
    return this.api.post('/consultoria/deletar', consultoria);
  }

  deleteSelected(consultorias: Consultoria[]): Observable<any> {
    return this.api.post('/consultoria/deletarLista', consultorias);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }

}

export interface ConsultoriasApi {
  consultorias: Consultoria[];
  numeroPaginas: number;
}

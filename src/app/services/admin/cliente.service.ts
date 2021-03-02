import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<ClientesApi> {
    return this.api.get(`/cliente/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/cliente/buscar?id=${id}`);
  }

  post(cliente: Cliente): Observable<any> {
    return this.api.post('/cliente/inserir', cliente);
  }

  patch(cliente: Cliente): Observable<any> {
    return this.api.post('/cliente/alterar', cliente);
  }

  delete(cliente: Cliente): Observable<any> {
    return this.api.post('/cliente/deletar', cliente);
  }

  deleteSelected(clientes: Cliente[]): Observable<any> {
    return this.api.post('/cliente/deletarLista', clientes);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }

}

export interface ClientesApi {
  clientes: Cliente[];
  numeroPaginas: number;
}

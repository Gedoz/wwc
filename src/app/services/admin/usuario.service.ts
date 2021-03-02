import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<UsuariosApi> {
    return this.api.get(`/usuario/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/usuario/buscar?id=${id}`);
  }

  getByEmail(email): Observable<any> {
    return this.api.get(`/usuario/buscar?email=${email}`);
  }

  post(user: Usuario): Observable<any> {
    return this.api.post('/usuario/inserir', user);
  }

  patch(user: Usuario): Observable<any> {
    return this.api.post('/usuario/alterar', user);
  }

  delete(user: Usuario): Observable<any> {
    return this.api.post('/usuario/deletar', user);
  }

  deleteSelected(users: Usuario[]): Observable<any> {
    return this.api.post('/usuario/deletarLista', users);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }

}

export interface UsuariosApi {
  usuarios: Usuario[];
  numeroPaginas: number;
}

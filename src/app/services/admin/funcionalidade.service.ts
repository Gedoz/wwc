import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionalidade } from 'src/app/models/funcionalidade.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadeService {

  constructor(
    public api: ApiService
  ) { }

  get(idModulo: number, filtro = ''): Observable<Funcionalidade[]> {
    return this.api.get(`/funcionalidade/buscar?filtro=${filtro}&idModulo=${idModulo}`);
  }

  getById(id): Observable<Funcionalidade> {
    return this.api.get(`/funcionalidade/buscar?id=${id}`);
  }

  post(funcionalidade: Funcionalidade): Observable<any> {
    return this.api.post('/funcionalidade/inserir', funcionalidade);
  }

  patch(funcionalidade: Funcionalidade): Observable<any> {
    return this.api.post('/funcionalidade/alterar', funcionalidade);
  }

  delete(funcionalidade: Funcionalidade): Observable<any> {
    return this.api.post('/funcionalidade/deletar', funcionalidade);
  }
}

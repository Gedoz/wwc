import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/models/banner.model';
import { Beneficio } from 'src/app/models/beneficio.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  constructor(
    public api: ApiService
  ) { }

  get(numeroPagina: number, registroPorPagina: number, ordenacao: string, sentidoOrdenacao: string, filtro: string = '%'): Observable<BeneficiosApi> {
    return this.api.get(`/beneficio/buscar?filtro=${filtro}&numeroPagina=${numeroPagina}&registroPorPagina=${registroPorPagina}&ordenacao=${ordenacao}&sentidoOrdenacao=${sentidoOrdenacao}`);
  }

  getById(id): Observable<any> {
    return this.api.get(`/beneficio/buscar?id=${id}`);
  }

  post(beneficio: Beneficio): Observable<any> {
    return this.api.post('/beneficio/inserir', beneficio);
  }

  patch(beneficio: Beneficio): Observable<any> {
    return this.api.post('/beneficio/alterar', beneficio);
  }

  delete(beneficio: Beneficio): Observable<any> {
    return this.api.post('/beneficio/deletar', beneficio);
  }

  deleteSelected(beneficios: Beneficio[]): Observable<any> {
    return this.api.post('/beneficio/deletarLista', beneficios);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }
}

export interface BeneficiosApi {
  beneficios: Beneficio[];
  numeroPaginas: number;
}

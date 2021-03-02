import { Injectable } from '@angular/core';
import { ConfiguracaoGeral } from 'src/app/models/configuracao-geral.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoGeralService {

  constructor(
    public api: ApiService
  ) { }

  get() {
    return this.api.get(`/configuracaoGeral/buscar`);
  }

  patch(configuracao: ConfiguracaoGeral) {
    return this.api.post(`/configuracaoGeral/alterar`, configuracao);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }
}

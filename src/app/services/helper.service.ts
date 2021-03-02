import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

export class ViaCEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  moment;
  editor;
  emailRegex: RegExp;
  urlRegex: RegExp;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '340px',
    uploadImagePath: '/api/upload',
    tooltip: false,
    toolbar: [
      ['misc', ['codeview']],
      ['style', ['bold', 'italic', 'underline']],
      ['para', ['style', 'ul', 'paragraph',]],
      ['insert', ['link', 'picture', 'video']],
    ],
  }

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private api: ApiService
  ) {
    moment.locale('pt-BR');
    this.moment = moment;
    this.emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 3200,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['white-snackbar']
    });
  }

  formMarkAllTouched(form: NgForm) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        (<any>Object).values(control.controls).forEach(c => this.formMarkAllTouched(c));
      }
    });
  }

  convertToSlug(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâãèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  viaCep(cep: string) {
    return this.http.get(`http://viacep.com.br/ws/${cep}/json/`)
  }

  buscarEstados() {
    return this.api.get(`/site/uf/buscar`);
  }

  buscarCidades(siglaUf: string, filtro: string = '%') {
    return this.api.get(`/site/Cidade/Buscar?siglaUf=${siglaUf}&filtro=${filtro}`);
  }
}

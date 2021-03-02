import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpStatus = new Subject<number>();
  httpError = new Subject<any>();

  constructor(
    public http: HttpClient,
    public global: GlobalService,
    public auth: AuthService
  ) { }

  get(url: string) {
    return this.http.get(this.global.apiUrl + url, {
      headers: this.auth.getAuthorizationHeader()
    }).pipe(
      map(r => r),
      catchError(this.handleError.bind(this))
    );

  }

  post(url: string, body = {}) {
    return this.http.post(this.global.apiUrl + url, body, {
      headers: this.auth.getAuthorizationHeader()
    }).pipe(
      map(r => r),
      catchError(this.handleError.bind(this))
    );
  }

  patch(url: string, body?) {

    return this.http.patch(this.global.apiUrl + url, body, {
      headers: this.auth.getAuthorizationHeader()
    }).pipe(
      map(r => r),
      catchError(this.handleError.bind(this))
    );
  }

  put(url: string, body?) {
    return this.patch(url, body);
  }

  delete(url: string, body?) {

    return this.http.delete(this.global.apiUrl + url, {
      headers: this.auth.getAuthorizationHeader(),
      params: body
    }).pipe(
      map(r => r),
      catchError(this.handleError.bind(this))
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error) {
      this.httpError.next(error.error);
    }
    if (error.status) {
      this.httpStatus.next(error.status);
    }
    return throwError(error);
  }

  postFile(fileToUpload: File, url: string, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(fileName, fileToUpload, fileToUpload.name);

    const options = {
      method: 'POST',
      httpParams: new HttpParams()
    }

    const req = new HttpRequest(options.method, this.global.apiUrl + url, formData, {
      params: options.httpParams,
      reportProgress: true,
      headers: this.auth.getAuthorizationHeader()
    });

    return this.http.request(req).pipe(map(r => r), catchError((e) => this.handleError(e)))
  }

  postAsFormData(
    url: string,
    body: Object,
    files: File[],
    options = {
      method: 'POST',
      httpParams: new HttpParams()
    }) {

    const formData = new FormData();
    // Coloca todo body no form data.., aproveita e da trim nas strings
    // provavelmente da pra fazer uma função recursiva só pra tratar os dados que são passadas para FormData
    Object.keys(body).forEach(k => {
      if (typeof body[k] === 'string') {
        body[k] = body[k].trim();
      }
      if (Array.isArray(body[k])) {
        body[k].forEach(val => {
          formData.append(k + '[]', val);
        });
      } else if (typeof body[k] === 'object' && body[k] !== null) {
        Object.keys(body[k]).forEach(l => {
          formData.append(k + '[' + l + ']', body[k][l]);
        });
      } else if (body[k] === null) {
        formData.append(k, '');
      } else {
        formData.append(k, body[k]);
      }
    });

    // Coloca todos files no FormData
    files.forEach((file: File, i) => {
      formData.append('image' + '[' + i + ']', file, file.name)
    });

    const req = new HttpRequest(options.method, this.global.apiUrl + url, formData, {
      params: options.httpParams,
      reportProgress: true,
      headers: this.auth.getAuthorizationHeader()
    });

    return this.http.request(req).pipe(
      map(r => r),
      catchError(this.handleError.bind(this))
    );
  }
}

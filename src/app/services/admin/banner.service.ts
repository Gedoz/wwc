import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/models/banner.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    public api: ApiService
  ) { }

  get(): Observable<Banner> {
    return this.api.get(`/banner/buscar`);
  }

  patch(banner: Banner) {
    return this.api.post(`/banner/alterar`, banner);
  }

  postFile(file: File, url: string, fileName: string) {
    return this.api.postFile(file, url, fileName);
  }
}

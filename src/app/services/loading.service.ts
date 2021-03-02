import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  active: boolean = false;
  title: string;

  constructor() { }

  present(title: string) {
    this.title = title;
    this.active = true;
  }

  dismiss() {
    this.active = false;
  }
}

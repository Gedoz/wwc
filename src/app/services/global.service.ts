import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  apiUrl: string = 'https://api.wwc.com.br';
  imageUrl: string = 'https://api.wwc.com.br/'
  menuOpen: boolean = false;

  constructor() { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}

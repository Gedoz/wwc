import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'header-website',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  active: boolean = false;
  menuOpen: boolean = false;

  @HostListener('window:scroll', [])
  handleScroll(): void {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 50) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}

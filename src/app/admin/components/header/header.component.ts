import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  search: string = '';
  pages = []

  constructor(
    public auth: AuthService,
    public global: GlobalService,
    public router: Router
  ) {
    this.buildPages();
  }

  ngOnInit() {
  }

  goTo(page: any) {
    if (page.route) {
      this.router.navigate([page.route]).then(() => {
        this.global.menuOpen = false;
      });
    } else {
      page.openGroup = !page.openGroup;
    }
  }

  logout() {
    this.router.navigate(['/admin/login']).then(() => {
      this.global.menuOpen = false;
      this.auth.logout();
    })
  }

  onSearchChange(ev) {
    if (!ev) {
      this.buildPages();
    }
  }

  buildPages() {
    this.pages = [
      { name: 'Home', icon: 'fas fa-home', route: '/admin' },
      { name: 'Banner', icon: 'fas fa-image', route: '/admin/banner' },
      { name: 'Clientes', icon: 'fas fa-user-tie', route: '/admin/clientes' },
      { name: 'Usuários', icon: 'fas fa-user-shield', route: '/admin/usuarios' },
      { name: 'Depoimentos', icon: 'fas fa-comments', route: '/admin/depoimentos' },
      { name: 'Benefícios', icon: 'fas fa-plus-square', route: '/admin/beneficios' },
      { name: 'Consultorias', icon: 'fas fa-user-tie', route: '/admin/consultorias' },
      { name: 'Perguntas', icon: 'fas fa-question', route: '/admin/perguntas' },
      { name: 'Módulos', icon: 'fas fa-monument', route: '/admin/modulos' },
      { name: 'Contato Geral', icon: 'fas fa-phone-alt', route: '/admin/contato-geral' },
      {
        name: 'Configurações',
        icon: 'fas fa-cogs',
        group: [
          { name: 'Geral', icon: 'fas fa-cog', route: '/admin/configuracao-geral' },
          { name: 'E-mail', icon: ' fas fa-paper-plane', route: '/admin/configuracao-email' },
        ],
        openGroup: false
      },
    ]
  }

}

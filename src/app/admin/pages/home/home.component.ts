import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pages = [];

  banner: Banner = new Banner();


  constructor(
    public _auth: AuthService,
    public _data: DataService
  ) { }

  ngOnInit() {
    this.buildPages();
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

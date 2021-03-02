import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { forkJoin, Subscription } from 'rxjs';
import { Banner } from 'src/app/models/banner.model';
import { Beneficio } from 'src/app/models/beneficio.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Consultoria } from 'src/app/models/consultoria.model';
import { Depoimento } from 'src/app/models/depoimento.model';
import { Modulo } from 'src/app/models/modulo.model';
import { Pergunta } from 'src/app/models/pergunta.model';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { AlertService } from 'src/app/services/website/alert.service';

import scrollSpy from 'simple-scrollspy'
import { NgwWowService } from 'ngx-wow';
import { NavigationEnd, Router } from '@angular/router';
import { ContatoGeral } from 'src/app/models/contato-geral.model';
const options = {
  sectionClass: '.scrollspy',
  menuActiveTarget: '.scrollspy-link',
  offset: 0
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  mensagem: any = {};
  phoneMask: string = '(00) 0000-00009';
  loading: boolean = true;

  depoimentosIndex: number = 0;
  depoimentosConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.feedbacks-arrows__item--next',
      prevEl: '.feedbacks-arrows__item--prev',
    },
  }

  config: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.consulting-arrows__item--right',
      prevEl: '.consulting-arrows__item--left',
    }
  }

  banner: Banner = new Banner();
  beneficios: Beneficio[] = [];
  consultorias: Consultoria[] = [];
  modulos: Modulo[] = [];
  clientes: Cliente[] = [];
  depoimentos: Depoimento[] = [];
  perguntas: Pergunta[] = [];
  contatoGeral: ContatoGeral = new ContatoGeral();

  constructor(
    public _data: DataService,
    public _global: GlobalService,
    public helper: HelperService,
    public _alert: AlertService,
    public _wow: NgwWowService,
    public router: Router
  ) {
    this.initWow();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.fork();
    scrollSpy('#header', options);
  }

  ngOnDestroy(): void {
    this.wowSubscription.unsubscribe();
  }

  wowSubscription: Subscription;
  initWow() {
    this.wowSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._wow.init();
      }
    });
  }

  fork() {

    const req = [
      this._data.getBanner(),
      this._data.getBeneficios(1, 3),
      this._data.getConsultorias(-99, -99),
      this._data.getModulos(1, 4),
      this._data.getClientes(-99, -99),
      this._data.getDepoimentos(-99, -99),
      this._data.getPerguntas(-99, -99),
      this._data.getContatoGeral()
    ]

    this.loading = true;

    forkJoin(req).subscribe((res: any) => {
      this.banner = res[0];
      this.beneficios = res[1];
      this.consultorias = res[2];
      this.modulos = res[3];
      this.clientes = res[4];
      this.depoimentos = res[5];
      this.perguntas = res[6];
      this.contatoGeral = res[7];
      this.loading = false;
    }, e => this.loading = false);
  }

  toogleItem(item) {
    const index = this.perguntas.indexOf(item);
    const itemClicked = this.perguntas[index];
    if (itemClicked.active) {
      itemClicked.active = false;
    } else {
      this.buildList();
      itemClicked.active = true;
    }
  }

  buildList() {
    this.perguntas = this.perguntas.map(p => {
      p.active = false;
      return p;
    })
  }

  changePhoneMask(event) {
    let val = event;
    if (!val) {
      return;
    }
    if (val.replace(/\D/g, '').substring(0, 4) == "0800") {
      this.phoneMask = '0000 000 0000';
    } else {
      if (val.replace(/\D/g, '').length === 11) {
        this.phoneMask = '(00) 0 0000-0000';
      } else {
        this.phoneMask = '(00) 0000-00009';
      }
    }
  }

  openWhatsapp() {
    window.open(`https://wa.me/55${this.contatoGeral.whatsApp}`, '_blank');
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      return;
    }

    this.loading = true;

    this._data.inserirContatoMensagem(this.mensagem)
      .subscribe((res: any) => {
        this._alert.present('Mensagem enviada', 'Em breve entraremos em contato.');
        f.reset();
        this.loading = false;
      }, e => {
        this._alert.present('Não foi possível enviar a mensagem!', 'Desculpe, mas não foi possível enviar a mensagem. Tente novamente outra hora.');
        this.loading = false;
      })

  }

}

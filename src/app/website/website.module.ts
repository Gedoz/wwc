import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxMaskModule } from 'ngx-mask';
import { AlertComponent } from './components/alert/alert.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgwWowModule } from 'ngx-wow';
import { WhatsappButtonComponent } from '../components/whatsapp-button/whatsapp-button.component';

@NgModule({
  declarations: [MainComponent, HomeComponent, HeaderComponent, FooterComponent, AlertComponent, WhatsappButtonComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    SwiperModule,
    NgxMaskModule.forChild(),
    ScrollToModule,
    NgwWowModule
  ]
})
export class WebsiteModule { }

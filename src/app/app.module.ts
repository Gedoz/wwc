import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// material
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ModalResetPasswordComponent } from './auth/components/modal-reset-password/modal-reset-password.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { getBrazilianPaginatorIntl } from './brazilian-paginator-intl';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { MaterialModule } from './material/material.module';
import { AuthGuardService } from './guards/auth.guard';
import { GuestGuardService } from './guards/guest.guard';
import { DialogComponent } from './components/dialog/dialog.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgwWowModule } from 'ngx-wow';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ModalResetPasswordComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SwiperModule,
    NgxMaskModule.forRoot(),
    ScrollToModule.forRoot(),
    NgwWowModule,
    MaterialModule,
    PipesModule,
  ],
  entryComponents: [
    LoadingComponent,
    ModalResetPasswordComponent,
  ],
  exports: [
    FormsModule,
    FilterPipe,
    SwiperModule,
    NgxMaskModule,
    ScrollToModule,
    NgwWowModule,
    PipesModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getBrazilianPaginatorIntl() },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    AuthGuardService,
    GuestGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

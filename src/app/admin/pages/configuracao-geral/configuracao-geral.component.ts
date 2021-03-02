import { ConfiguracaoGeral } from 'src/app/models/configuracao-geral.model';
import { ConfiguracaoGeralService } from 'src/app/services/admin/configuracao-geral.service';
// default
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpProgressEvent } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-configuracao-geral',
  templateUrl: './configuracao-geral.component.html',
  styleUrls: ['./configuracao-geral.component.scss']
})
export class ConfiguracaoGeralComponent implements OnInit {

  data: ConfiguracaoGeral = new ConfiguracaoGeral();

  file: File;
  progress: number;

  constructor(
    public configuracaoGeralService: ConfiguracaoGeralService,
    public helper: HelperService,
    public loadingService: LoadingService,
    public router: Router,
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.configuracaoGeralService.get()
      .subscribe((res: ConfiguracaoGeral) => this.data = res);
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando...');

    this.configuracaoGeralService.patch(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin']).then(() => {
          this.helper.openSnackBar('Item alterado com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => this.loadingService.dismiss());

  }

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  onFileSelected(files) {
    this.file = files.item(0);
    this.loadingService.present('Alterando imagem...');
    this.submitImages(this.file, '/configuracaoGeral/imagem').then((res: any) => {
      this.data.imagemLogo = res.body;
      this.loadingService.dismiss();
    }).catch(() => {
      this.progress = 0;
      this.fileInput.nativeElement.value = '';
      this.loadingService.dismiss();
    });
  }

  submitImages(file: File, url: string) {
    if (!file) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.configuracaoGeralService.postFile(file, url, 'image')
        .subscribe((event: HttpProgressEvent | any) => {
          if (event.type === 4) {
            this.progress = 0;
            resolve(event);
          } else {
            this.progress = Math.round((event.loaded / event.total) * 100);
            if (isNaN(this.progress)) {
              this.progress = 100;
            }
            this.loadingService.title = `${this.progress}%`;
          }
        }, err => reject(err));
    });
  }
}

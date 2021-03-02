import { Depoimento } from 'src/app/models/depoimento.model';
import { DepoimentoService } from 'src/app/services/admin/depoimento.service';
// default
import { HttpProgressEvent } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-depoimentos-criar',
  templateUrl: './depoimentos-criar.component.html',
  styleUrls: ['./depoimentos-criar.component.scss']
})
export class DepoimentosCriarComponent implements OnInit {

  data: Depoimento = new Depoimento();

  file: File;
  progress: number = 0;

  constructor(
    public depoimentoService: DepoimentoService,
    public helper: HelperService,
    public loadingService: LoadingService,
    public router: Router,
    public global: GlobalService
  ) { }

  ngOnInit() {
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Inserindo item...');

    this.depoimentoService.post(this.data)
      .subscribe((res: any) => {
        this.submitImages(this.file, '/depoimento/imagem?id=' + res);
        this.router.navigate(['/admin/depoimentos']).then(() => {
          this.helper.openSnackBar('Item inserido com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss()
      });
  }

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  onFileSelected(files) {
    this.file = files.item(0);
    this.loadingService.present('0%');
    this.submitImages(this.file, '/depoimento/imagem?id=-99').then((res: any) => {
      this.data.imagem = res.body;
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
      this.depoimentoService.postFile(file, url, 'image')
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

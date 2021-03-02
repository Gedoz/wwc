import { Beneficio } from 'src/app/models/beneficio.model';
import { BeneficioService } from 'src/app/services/admin/beneficio.service';
// default
import { HttpProgressEvent } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-beneficios-editar',
  templateUrl: './beneficios-editar.component.html',
  styleUrls: ['./beneficios-editar.component.scss']
})
export class BeneficiosEditarComponent implements OnInit {

  data: Beneficio = new Beneficio();

  file: File;
  progress: number = 0;

  constructor(
    public beneficioService: BeneficioService,
    public helper: HelperService,
    public loadingService: LoadingService,
    public router: Router,
    public route: ActivatedRoute,
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.buscar(param.id));
  }

  buscar(id: number) {
    this.beneficioService.getById(id)
      .subscribe(res => this.data = res);
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando item...');

    this.beneficioService.patch(this.data)
      .subscribe((res: any) => {
        this.submitImages(this.file, '/beneficio/imagem?id=' + this.data.id);
        this.router.navigate(['/admin/beneficios']).then(() => {
          this.helper.openSnackBar('Item alterado com sucesso.');
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
    this.submitImages(this.file, '/beneficio/imagem?id=-99').then((res: any) => {
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
      this.beneficioService.postFile(file, url, 'image')
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

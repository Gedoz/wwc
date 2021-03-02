import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/admin/cliente.service';
// Default
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpProgressEvent } from '@angular/common/http';

@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['./clientes-editar.component.scss']
})
export class ClientesEditarComponent implements OnInit {

  data: Cliente = new Cliente();

  file: File;
  progress: number = 0;

  constructor(
    public clienteService: ClienteService,
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
    this.clienteService.getById(id).subscribe((res: Cliente) => this.data = res);
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando item...');

    this.clienteService.patch(this.data)
      .subscribe((res: any) => {
        this.submitImages(this.file, '/cliente/imagem?id=' + this.data.id);
        this.router.navigate(['/admin/clientes']).then(() => {
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
    this.submitImages(this.file, '/cliente/imagem?id=-99').then((res: any) => {
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
      this.clienteService.postFile(file, url, 'image')
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

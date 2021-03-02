import { Consultoria } from 'src/app/models/consultoria.model';
import { ConsultoriaService } from 'src/app/services/admin/consultoria.service';
// default
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-consultorias-criar',
  templateUrl: './consultorias-criar.component.html',
  styleUrls: ['./consultorias-criar.component.scss']
})
export class ConsultoriasCriarComponent implements OnInit {

  data: Consultoria = new Consultoria();

  constructor(
    public consultoriaService: ConsultoriaService,
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

    this.consultoriaService.post(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin/consultorias']).then(() => {
          this.helper.openSnackBar('Item inserido com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss()
      });
  }

}

import { Consultoria } from 'src/app/models/consultoria.model';
import { ConsultoriaService } from 'src/app/services/admin/consultoria.service';
// default
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-consultorias-editar',
  templateUrl: './consultorias-editar.component.html',
  styleUrls: ['./consultorias-editar.component.scss']
})
export class ConsultoriasEditarComponent implements OnInit {

  data: Consultoria = new Consultoria();

  constructor(
    public consultoriaService: ConsultoriaService,
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
    this.consultoriaService.getById(id).subscribe(res => this.data = res);
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando item...');

    this.consultoriaService.patch(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin/consultorias']).then(() => {
          this.helper.openSnackBar('Item alterado com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss()
      });
  }

}

import { Pergunta } from 'src/app/models/pergunta.model';
import { PerguntaService } from 'src/app/services/admin/pergunta.service';
// default
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-perguntas-editar',
  templateUrl: './perguntas-editar.component.html',
  styleUrls: ['./perguntas-editar.component.scss']
})
export class PerguntasEditarComponent implements OnInit {

  data: Pergunta = new Pergunta();

  constructor(
    public perguntaService: PerguntaService,
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
    this.perguntaService.getById(id).subscribe((res: Pergunta) => this.data = res);
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando item...');

    this.perguntaService.patch(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin/perguntas']).then(() => {
          this.helper.openSnackBar('Item alterado com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss()
      });
  }

}

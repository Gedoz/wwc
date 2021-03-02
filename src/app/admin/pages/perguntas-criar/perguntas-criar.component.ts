import { Pergunta } from 'src/app/models/pergunta.model';
import { PerguntaService } from 'src/app/services/admin/pergunta.service';
// default
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-perguntas-criar',
  templateUrl: './perguntas-criar.component.html',
  styleUrls: ['./perguntas-criar.component.scss']
})
export class PerguntasCriarComponent implements OnInit {

  data: Pergunta = new Pergunta();

  constructor(
    public perguntaService: PerguntaService,
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

    this.perguntaService.post(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin/perguntas']).then(() => {
          this.helper.openSnackBar('Item inserido com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss()
      });
  }

}

import { UsuarioService } from 'src/app/services/admin/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
// Default
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-usuarios-criar',
  templateUrl: './usuarios-criar.component.html',
  styleUrls: ['./usuarios-criar.component.scss']
})
export class UsuariosCriarComponent implements OnInit {

  data: Usuario = new Usuario();

  constructor(
    public usuarioService: UsuarioService,
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

    if (this.data.senha !== this.data.re_senha) {
      this.helper.openSnackBar('As senhas precisam ser iguais.');
      return;
    }

    this.loadingService.present('Inserindo item...');

    this.usuarioService.post(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin/usuarios']).then(() => {
          this.helper.openSnackBar('Item inserido com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss()
      });
  }

  onSituacaoChange(event: MatSlideToggleChange) {
    event.checked ? this.data.situacao = 'A' : this.data.situacao = 'I';
  }

}

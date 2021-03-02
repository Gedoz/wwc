import { UsuarioService } from 'src/app/services/admin/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
// Default
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.scss']
})
export class UsuariosEditarComponent implements OnInit {

  data: Usuario = new Usuario();
  hide: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
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
    this.usuarioService.getById(id).subscribe((res: Usuario) => this.data = res);
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Inserindo item...');

    this.usuarioService.patch(this.data)
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

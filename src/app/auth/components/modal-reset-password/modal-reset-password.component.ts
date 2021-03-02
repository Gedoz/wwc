import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-reset-password',
  templateUrl: './modal-reset-password.component.html',
  styleUrls: ['./modal-reset-password.component.scss']
})
export class ModalResetPasswordComponent implements OnInit {

  user: Usuario = new Usuario();
  loading: boolean = false;

  constructor(
    public helper: HelperService,
    public loadingService: LoadingService,
    public auth: AuthService,
    public http: HttpClient,
    public global: GlobalService,
    public router: Router,
    public dialogRef: MatDialogRef<ModalResetPasswordComponent>) {
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  recuperarSenha() {

    if (this.user.senha !== this.user.re_senha) {
      this.helper.openSnackBar('As senhas não coincidem.');
      return;
    }

    this.dialogRef.close(true);
    this.loadingService.present('Recuperando a conta...');
    this.auth.user.senha = this.user.senha;
    this.http.post(this.global.apiUrl + '/usuario/alterarSenha', this.auth.user)
      .subscribe((res: any) => {
        if (res) {
          this.auth.login(this.auth.user).subscribe((res: any) => {
            this.auth.getUser(this.auth.user).then((r: any) => {
              this.auth.setToken(btoa(this.auth.user.email + ':' + this.auth.user.senha));
              this.auth.setUser(r);
              this.router.navigate(['/admin']);
              this.loadingService.dismiss();
            }, e => {
              this.loadingService.dismiss();
            });
          })
        } else {
          this.helper.openSnackBar('Algo deu errado, tente novamente.');
          this.loadingService.dismiss();
        }
      }, e => {
        this.helper.openSnackBar(e.error);
        this.loadingService.dismiss();
      })
  }

}

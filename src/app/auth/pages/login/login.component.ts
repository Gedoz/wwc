import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalResetPasswordComponent } from 'src/app/auth/components/modal-reset-password/modal-reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: Usuario = new Usuario();
  isLogin: boolean = true;

  constructor(
    public auth: AuthService,
    public helper: HelperService,
    public loadingService: LoadingService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      return;
    }

    this.loadingService.present('Fazendo o login, aguarde...');

    this.auth.login(this.user).subscribe((res: any) => {
      if (res) {
        this.auth.getUser(this.user).then((r: Usuario) => {
          if (r.solicitaAlteracao == 'S' && (this.user.senha == r.codigoRecuperacao)) {
            this.auth.isRecuperarSenha = true;
            const dialogRef = this.dialog.open(ModalResetPasswordComponent, {
              width: '420px',
            });

            dialogRef.afterClosed().subscribe(result => {
            });
          } else {
            this.auth.setToken(btoa(this.user.email + ':' + this.user.senha));
            this.router.navigate(['/admin']);
          }
          this.loadingService.dismiss()
          this.auth.setUser(r);
        }, e => {
          this.helper.openSnackBar(e.error);
          this.loadingService.dismiss()
        });
      } else {
        this.loadingService.dismiss();
      }
    }, e => {
      this.helper.openSnackBar(e.error);
      this.loadingService.dismiss()
    });
  }

  esqueceuSenha(f: NgForm) {
    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha o formulário corretamente');
      return;
    }

    this.loadingService.present('Recuperando senha...');

    this.auth.forgotPassword(this.user).then((res: any) => {
      this.helper.openSnackBar('Verifique sua caixa de entrada. E-mail enviado.');
      f.reset();
      this.loadingService.dismiss();
    }).catch((e) => {
      this.helper.openSnackBar(e.error);
      this.loadingService.dismiss();
    })
  }

}

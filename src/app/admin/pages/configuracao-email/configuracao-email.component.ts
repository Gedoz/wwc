import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ConfiguracaoEmail } from 'src/app/models/configuracao-email.model';
import { ConfiguracaoEmailService } from 'src/app/services/admin/configuracao-email.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-configuracao-email',
  templateUrl: './configuracao-email.component.html',
  styleUrls: ['./configuracao-email.component.scss']
})
export class ConfiguracaoEmailComponent implements OnInit {

  data: ConfiguracaoEmail = new ConfiguracaoEmail();
  hide: boolean = true;

  constructor(
    public configuracaoEmailService: ConfiguracaoEmailService,
    public helper: HelperService,
    public loadingService: LoadingService,
    public router: Router
  ) { }

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.configuracaoEmailService.get()
      .subscribe((res: ConfiguracaoEmail) => this.data = res);
  }

  onSslChange(event: MatSlideToggleChange) {
    event.checked ? this.data.ssl = 'S' : this.data.ssl = 'N';
  }

  submit(f: NgForm) {

    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando...');

    this.configuracaoEmailService.patch(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin']).then(() => {
          this.helper.openSnackBar('Item alterado com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => this.loadingService.dismiss());

  }

}
